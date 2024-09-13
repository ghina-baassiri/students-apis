import { MongoClient } from 'mongodb';
let mongoClient;

async function connectToDB(uri) {
    try {
        if (!mongoClient) {
            mongoClient = new MongoClient(uri);
            await mongoClient.connect();
            console.log('Connection to MongoDB Succeeded.');
        }
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Failed.', error);
        throw new Error('Connection to MongoDB Failed.');
    }
}

// Add student
export async function addStudent(studentObj) {
    const uri = process.env.DB_URI;
    try {
        const mongoClient = await connectToDB(uri);
        const db = mongoClient.db('school');
        const collection = db.collection('students');
        await collection.insertOne(studentObj);
        return 'Student added successfully.';
    } catch (error) {
        console.error(error);
        return 'Failed to add student.';
    }
}

// Get all students
export async function getAllStudents() {
    const uri = process.env.DB_URI;
    try {
        const mongoClient = await connectToDB(uri);
        const db = mongoClient.db('school');
        const collection = db.collection('students');
        return await collection.find({}).toArray();
    } catch (error) {
        console.error(error);
        return 'Failed to get students.';
    }
}

// Get student by name
export async function getStudentsByName(name) {
    const uri = process.env.DB_URI;
    try {
        const mongoClient = await connectToDB(uri);
        const db = mongoClient.db('school');
        const collection = db.collection('students');
        return await collection.find({ name }).toArray();
    } catch (error) {
        console.error(error);
        return 'Failed to get filtered students.';
    }
}

// Update student
export async function updateStudentByName(name, updateFields) {
    const uri = process.env.DB_URI;
    try {
        const mongoClient = await connectToDB(uri);
        const db = mongoClient.db('school');
        const collection = db.collection('students');
        await collection.updateMany({ name }, { $set: updateFields });
        return 'Student updated successfully.';
    } catch (error) {
        console.error(error);
        return 'Failed to update student.';
    }
}

// Delete student
export async function deleteStudentByName(name) {
    const uri = process.env.DB_URI;
    try {
        const mongoClient = await connectToDB(uri);
        const db = mongoClient.db('school');
        const collection = db.collection('students');
        await collection.deleteOne({ name });
        return 'Student deleted successfully.';
    } catch (error) {
        console.error(error);
        return 'Failed to delete student.';
    }
}
