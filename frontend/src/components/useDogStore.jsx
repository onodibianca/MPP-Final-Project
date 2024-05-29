import create from 'zustand';

// Save state to local storage
const saveToLocalStorage = (state) => {
    localStorage.setItem('dogStore', JSON.stringify(state));
};

// Load state from local storage
const loadFromLocalStorage = () => {
    const state = localStorage.getItem('dogStore');
    return state ? JSON.parse(state) : { dogs: [], unsavedChanges: [] };
};

const useDogStore = create((set, get) => ({
    ...loadFromLocalStorage(),
    fetchDogs: async () => {
        try {
            const response = await fetch('http://localhost:4000/dogs');
            if (!response.ok) throw new Error('Network response was not ok.');
            const dogs = await response.json();
            set({ dogs });
            saveToLocalStorage(get());
        } catch (error) {
            console.error('Fetch dogs failed:', error);
        }
    },
    addDog: async (name, age, breed) => {
        const newDog = { id: Date.now().toString(), name, age, breed }; // Add an ID for offline tracking
        set(state => ({
            dogs: [...state.dogs, newDog],
            unsavedChanges: [...state.unsavedChanges, { type: 'add', data: newDog }]
        }));
        saveToLocalStorage(get());

        try {
            const response = await fetch('http://localhost:4000/dogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDog)
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const addedDog = await response.json();
            set(state => ({
                dogs: state.dogs.map(dog => dog.id === newDog.id ? addedDog : dog),
                unsavedChanges: state.unsavedChanges.filter(change => change.data.id !== newDog.id)
            }));
            saveToLocalStorage(get());
        } catch (error) {
            console.error('Add dog failed:', error);
        }
    },
    updateDog: async (id, name, age, breed) => {
        const updatedDog = { id, name, age, breed };
        set(state => ({
            dogs: state.dogs.map(dog => dog.id === id ? updatedDog : dog),
            unsavedChanges: [...state.unsavedChanges, { type: 'update', data: updatedDog }]
        }));
        saveToLocalStorage(get());

        try {
            const response = await fetch(`http://localhost:4000/dogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDog)
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const result = await response.json();
            set(state => ({
                dogs: state.dogs.map(dog => dog.id === id ? result : dog),
                unsavedChanges: state.unsavedChanges.filter(change => change.data.id !== id)
            }));
            saveToLocalStorage(get());
        } catch (error) {
            console.error('Update dog failed:', error);
        }
    },
    deleteDog: async (id) => {
        set(state => ({
            dogs: state.dogs.filter(dog => dog.id !== id),
            unsavedChanges: [...state.unsavedChanges, { type: 'delete', data: { id } }]
        }));
        saveToLocalStorage(get());

        try {
            const response = await fetch(`http://localhost:4000/dogs/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            const result = await response.json();
            console.log('Delete success:', result);
            set(state => ({
                unsavedChanges: state.unsavedChanges.filter(change => change.data.id !== id)
            }));
            saveToLocalStorage(get());
        } catch (error) {
            console.error('Delete dog failed:', error);
        }
    },
    retryUnsavedChanges: async () => {
        const { unsavedChanges } = get();
        for (const change of unsavedChanges) {
            if (change.type === 'add') {
                await get().addDog(change.data.name, change.data.age, change.data.breed);
            } else if (change.type === 'update') {
                await get().updateDog(change.data.id, change.data.name, change.data.age, change.data.breed);
            } else if (change.type === 'delete') {
                await get().deleteDog(change.data.id);
            }
        }
        set({ unsavedChanges: [] });
        saveToLocalStorage(get());
    }
}));

export default useDogStore;
