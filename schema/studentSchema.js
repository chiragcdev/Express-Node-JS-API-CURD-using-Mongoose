import mongoose from "mongoose";

// Define the student schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

export default studentSchema;