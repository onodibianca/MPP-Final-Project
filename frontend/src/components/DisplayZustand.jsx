import React, { useEffect } from 'react';
import useDogStore from './useDogStore';

const DogsList = () => {
    const { dogs, fetchDogs, retryUnsavedChanges } = useDogStore(state => ({
        dogs: state.dogs,
        fetchDogs: state.fetchDogs,
        retryUnsavedChanges: state.retryUnsavedChanges
    }));

    useEffect(() => {
        fetchDogs();
        // Listen for online status and retry unsaved operations when online
        window.addEventListener('online', retryUnsavedChanges);
        return () => {
            window.removeEventListener('online', retryUnsavedChanges);
        };
    }, [fetchDogs, retryUnsavedChanges]);

    return (
        <div>
            <h1>Dogs List</h1>
            <ul>
                {dogs.map(dog => (
                    <li key={dog.id}>
                        {dog.name} - {dog.age} years old - {dog.breed}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogsList;
