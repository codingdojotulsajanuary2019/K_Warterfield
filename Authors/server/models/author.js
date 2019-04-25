const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    comment: {type: String, required: [true, 'Reviews must contain a comment.']},
    rating: {type: Number, required: [true, 'Reviews must contain a rating']}
}, {timestamps: true})

const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Must include a name for this author entry.']},
    avg_rating: {type: Number},
    reviews: [ReviewSchema]
}, {timestamps: true})

mongoose.model('Author', AuthorSchema);
mongoose.model('Review', ReviewSchema);