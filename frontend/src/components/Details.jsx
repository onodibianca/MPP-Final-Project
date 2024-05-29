import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import useDogStore from "./useDogStore";

function Details() {
    const { state } = useLocation();
    const { dogs } = useDogStore();

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

    return (
        <div style={{ margin: "10rem" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Age: {age}</Card.Subtitle>
                    <Card.Text>
                        Breed: {breed}
                    </Card.Text>
                    <Link to="/">
                        <Button variant="primary">Go Back</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Details;
