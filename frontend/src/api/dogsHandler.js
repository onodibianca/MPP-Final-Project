 // Fetches dog data directly from the API.

export const fetchDogsDirectly = async () => {
    try {
        const response = await fetch('http://localhost:4000/dogs');
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch dogs:', error);
        throw error;
    }
};


 // Sends a request to add a new dog. 

export const addDogDirectly = async (name, age, breed) => {
    try {
        const response = await fetch('http://localhost:4000/dogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, breed })
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Failed to add dog:', error);
        throw error;
    }
};

