import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useDogStore from "./useDogStore";

function Home() {
    const navigate = useNavigate();
    const { dogs, fetchDogs, deleteDog } = useDogStore();

    useEffect(() => {
        fetchDogs(); // Fetch dogs when the component mounts
    }, [fetchDogs]);

    const handleEdit = (id) => {
        navigate(`/edit`, { state: { id } });
    };

    const handleViewDetails = (id) => {
        navigate(`/details`, { state: { id } });
    };

    const handleDelete = (id) => {
        deleteDog(id); // Calls delete from store
    };

    return (
        <div style={{ margin: "10rem" }}>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Breed</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {dogs.map((dog) => (
                    <tr key={dog.id}>
                        <td>{dog.name}</td>
                        <td>{dog.age}</td>
                        <td>{dog.breed}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDelete(dog.id)}>Delete</Button>
                            <Button variant="secondary" onClick={() => handleEdit(dog.id)}>Edit</Button>
                            <Button variant="info" onClick={() => handleViewDetails(dog.id)}>View Details</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Link to="/add">
                <Button variant="primary">Add New Dog</Button>
            </Link>
        </div>
    );
}

export default Home;
