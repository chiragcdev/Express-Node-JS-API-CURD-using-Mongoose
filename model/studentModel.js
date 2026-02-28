import mongoose from "mongoose";    
import studentSchema from "../schema/studentSchema.js";

// Create the student model using the schema
const studentModel = mongoose.model("students", studentSchema);

export default studentModel;