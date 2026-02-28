import mongoose from "mongoose";
import express from "express";
import studentModel from "./model/studentModel.js";

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Connect to MongoDB
await mongoose.connect("mongodb://localhost:27017/school").then(() => {
    console.log("_______Connected to DB_______");
})

// Get all students data from DB
app.get("/",  async (req, resp) => {
    const studentData = await studentModel.find();
    resp.send(studentData);
})

// Data Stored in DB using Post API request
app.post("/save",  async (req, resp) => {
    console.log(req.body);
    const {name, age, email} = req.body;
    if(!req.body || !name || !age || !email) {
        resp.send({
            "message": "All fields are required",
            "success": false
        })
        return false;
    }
    const studentData = await studentModel.create(req.body);
    resp.send({
        "message": "Data saved successfully",
        "success": true,
        "data": studentData
    });
})

// Update student data by ID using Put API request
app.put("/update/:id",  async (req, resp) => {
    console.log(req.body);
    const id = req.params.id;
    const {name, age, email} = req.body;
    if(!req.body || !name || !age || !email){
        resp.send({
            "message": "All fields are required",
            "success": false
        })
        return false;
    }
    const studentData = await studentModel.findByIdAndUpdate(id, {
        ...req.body
    });
    resp.send({
        "message": "Data updated successfully",
        "success": true,
        "data": studentData
    })
})


// Delete student data by ID using Delete API request
app.delete("/delete/:id",  async (req, resp) => {
    console.log(req.body);
    const id = req.params.id;
    const studentData = await studentModel.findByIdAndDelete(id);
    resp.send({
        "message": "Data deleted successfully",
        "success": true,
        "data": studentData
    })
})




app.listen(3500);

// async function connectDB() {
//     await mongoose.connect("mongodb://localhost:27017/school");
//     const schema = new mongoose.Schema({
//         name: String,
//         age: Number,
//         email: String
//     })
//     const studentModel = mongoose.model("students", schema);
//     const result = await studentModel.find();
//     console.log(result);
// }
// connectDB();