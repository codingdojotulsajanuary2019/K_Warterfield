const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required!'], minlength: [3, 'Title must be 3 characters long!']},
    description: {type: String, required: [true, 'Description is required!'], minlength: [3, 'Description must be 3 characters long!']},
    completed: {type: Boolean, default: false}
}, {timestamps: true});

mongoose.model('Task', TaskSchema);