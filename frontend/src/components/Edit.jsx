import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import useDogStore from "./useDogStore";

function Edit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { dogs, updateDog } = useDogStore();

    const myDog = dogs.find(dog => dog.id === state.id);
    const [name, setName] = useState(myDog?.name);
    const [age, setAge] = useState(myDog?.age);
    const [breed, setBreed] = useState(myDog?.breed);

    useEffect(() => {
        if (myDog) {
            setName(myDog.name);
            setAge(myDog.age);
            setBreed(myDog.breed);
        }
    }, [myDog]);

    const handleUpdate = () => {
        updateDog(state.id, name, age, breed);
        navigate("/");
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }} onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
            }}>
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
                <Button type="submit">Update</Button>
            </Form>
        </div>
    );
}

export default Edit;
