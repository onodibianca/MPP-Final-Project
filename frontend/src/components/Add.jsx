import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useDogStore from "./useDogStore";
function Add() {
    const navigate = useNavigate();
    const { addDog } = useDogStore();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDog(name, parseInt(age, 10), breed); // Ensure age is an integer
        navigate("/");
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAge">
                    <Form.Control
                        type="number"
                        placeholder="Enter Age"
                        value={age}
                        required
                        onChange={(e) => setAge(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBreed">
                    <Form.Control
                        type="text"
                        placeholder="Enter Breed"
                        value={breed}
                        required
                        onChange={(e) => setBreed(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Add;
