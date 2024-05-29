import React, { useState, useEffect } from 'react';
import useDogStore from './store/useDogStore';

const UpdateDog = ({ dogId }) => {
    const { dogs, updateDog } = useDogStore(state => ({
        dogs: state.dogs,
        updateDog: state.updateDog
    }));

    const dog = dogs.find(d => d.id === dogId);

    const [name, setName] = useState(dog ? dog.name : '');
    const [age, setAge] = useState(dog ? dog.age : 0);
    const [breed, setBreed] = useState(dog ? dog.breed : '');

    useEffect(() => {
        if (dog) {
            setName(dog.name);
            setAge(dog.age);
            setBreed(dog.breed);
        }
    }, [dog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDog(dogId, { name, age, breed });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Update Dog</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
            <button type="submit">Update Dog</button>
        </form>
    );
};

export default UpdateDog;
