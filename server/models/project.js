const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    Students: {
        type: Array,
        required:true
    },
    
    year: {
        type: Number,
        required: true
    },
    guides: {
        type:Array,
        required:true
    },
    amount: {
        type: Number,
        required:true
    },
    duration: {
        type: Number,
        required:true
    },
    Start_date: {
        type: Date,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    progress: {
        type: Array,
        required:true
    },
})

const student = mongoose.model("Student", StudentSchema);
module.exports = student;