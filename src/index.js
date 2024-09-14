import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { addStudent, getAllStudents, getStudentsByName, updateStudentByName, deleteStudentByName } from './db.js';
config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send('Error loading students');
    }
});

app.post('/addStudent', async (req, res) => {
    try {
        await addStudent(req.body);
        res.status(201).send("Successfully added student");
    } catch (error) {
        res.status(500).send("Error adding student: " + error.message);
    }
});

app.post('/filterStudentsByName', async (req, res) => {
    try {
        const students = await getStudentsByName(req.body.name);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send('Error filtering students');
    }
});

app.post('/updateStudent', async (req, res) => {
    try {
        const { name, updateFields } = req.body;
        await updateStudentByName(name, updateFields);
        res.status(200).send("Successfully updated student");
    } catch (error) {
        res.status(500).send("Error updating student");
    }
});

app.post('/deleteStudentByName', async (req, res) => {
    try {
        console.log('delete name', req.body.name);
        
        await deleteStudentByName(req.body.name);
        res.status(200).send("Successfully deleted student");
    } catch (error) {
        res.status(500).send("Error deleting student");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
