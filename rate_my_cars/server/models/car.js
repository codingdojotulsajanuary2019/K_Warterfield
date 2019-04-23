const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: [true, 'Comments must have content.']},
    rating: {type: Number, required: [true, 'Comments must include a rating']},
}, {timestamps: true})

const CarSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required!'], minlength: [3, 'Title must be 3 characters long!']},
    image_url: {type: String, required: [true, 'Description is required!'], minlength: [10, 'Image URL must be 10 characters long!']},
    average_rating: {type: Number, required: false},
    comments: [CommentSchema]
}, {timestamps: true})

mongoose.model('Car', CarSchema);
mongoose.model('Comment', CommentSchema);