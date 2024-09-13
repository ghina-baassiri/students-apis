import {MongoClient} from 'mongodb';
let mongoClient;

async function connectToDB(uri){
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        console.log('Connection to MongoDB Succeeded.')
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Failed.')
        return 'Connection to MongoDB Failed.';
    }  
}

// Add student
export async function addStudent(studentObj)
{
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db =  mongoClient.db('school');
    const collection = db.collection('students');
    try {
        await collection.insertOne(studentObj);
    } catch (error) {
        return 'Failed to add student.';
    }
    
}

// Get student by name 
export async function getAllStudents(){
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db =  mongoClient.db('school');
    const collection = db.collection('students');
    try {
        return collection.find({}).toArray();
    } catch (error) {
        return 'Failed to get students.';
    }
}

// Get student by name 
export async function getStudentsByName(name){
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db =  mongoClient.db('school');
    const collection = db.collection('students');
    try {
        return collection.find({name}).toArray();
    } catch (error) {
        return 'Failed to get filtered students.';
    }
}

// Update student
export async function updateStudentByName( name, updateFields){
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db =  mongoClient.db('school');
    const collection = db.collection('students');
    try {
        await collection.updateMany(
            {name},
            {$set:updateFields}
        )
    } catch (error) {
        return 'Failed to update student.';
    }
    
}

// Delete student
export async function deleteStudentByName(name){
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db =  mongoClient.db('school');
    const collection = db.collection('students');
    try {
        await collection.deleteOne({name})
    } catch (error) {
        return 'Failed to delete student.';
    }
}
