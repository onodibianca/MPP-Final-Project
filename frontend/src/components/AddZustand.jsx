import React, { useState } from 'react';
import useDogStore from './useDogStore';

const AddDog = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const addDog = useDogStore(state => state.addDog);

    const handleSubmit = (e) => {
        e.preventDefault();
        addDog(name, parseInt(age, 10), breed);
        setName('');
        setAge('');
        setBreed('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add a New Dog</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
            <button type="submit">Add Dog</button>
        </form>
    );
};

export default AddDog;
