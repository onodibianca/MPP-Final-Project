import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dogs from "./Dogs";
import { randomUUID } from "crypto";
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

// gets list
app.get("/dogs", (req: Request, res: Response) => {
    res.send(Dogs);
    console.log("dogs sent");
});

//get one
app.get("/dogs/:id", (req: Request, res: Response) => {
    console.log(req.params.id);
    const searchId = req.params.id;
    const foundDog = Dogs.find((dog) => dog.id === searchId);
    if (!foundDog) {
        res.send(undefined);
        return;
    }
    res.send(foundDog);
});

//post
app.post("/dogs", (req: Request, res: Response) => {
    const { name, age, breed } = req.body;
    const newDog = {
        id: randomUUID(),
        name,
        age,
        breed,
    };
    Dogs.push(newDog);
    console.log(Dogs);
    res.json({ message: "Dog added successfully", dog: newDog });
});

//patch/ update
app.put("/dogs/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, age, breed } = req.body;
    const dogIndex = Dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
        Dogs[dogIndex] = { ...Dogs[dogIndex], name, age, breed };
        console.log(Dogs);
        res.json({ message: "Dog updated successfully", dog: Dogs[dogIndex] });
    } else {
        res.status(404).json({ error: "Dog not found" });
    }
});

//delete
app.delete("/dogs/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const dogIndex = Dogs.findIndex((dog) => dog.id === id);
    if (dogIndex !== -1) {
        Dogs.splice(dogIndex, 1);
        console.log(Dogs);
        res.json({ message: "Dog deleted successfully" });
    } else {
        res.status(404).json({ error: "Dog not found" });
    }
});

app.listen(port, () => {
    console.group();
    console.log(`Server started at port ${port}`);
    console.groupEnd();
});

export default app;
