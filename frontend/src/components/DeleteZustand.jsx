import React from 'react';
import useDogStore from './useDogStore';

const DeleteDog = ({ dogId, onClose }) => {
    const { deleteDog } = useDogStore(state => ({
        deleteDog: state.deleteDog
    }));

    const handleDelete = () => {
        deleteDog(dogId);
        if (onClose) onClose();  // Optionally close modal or navigate away
    };

    return (
        <div>
            <h1>Are you sure you want to delete this dog?</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default DeleteDog;
