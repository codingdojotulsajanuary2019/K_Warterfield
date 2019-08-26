const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Reviews must include a name.'], minlength: [3, 'Name must be at least 3 chatacters long!']},
    comment: {type: String, required: [true, 'Reviews must contain a comment.'], minlength: [5, 'Title must be 3 characters long!']},
    rating: {type: Number, required: [true, 'Reviews must contain a rating.']}
}, {timestamps: true})

const RestaurantSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Must include a name for this restaurant entry.'], minlength: [3, 'Title must be 3 characters long!']},
    cuisine: {type: String, required: [true, 'Must include a cuisine type.'], minlength: [3, 'Cuisine type must be 3 characters long!']},
    avg_rating: {type: Number},
    reviews: [ReviewSchema]
}, {timestamps: true})

mongoose.model('Restaurant', RestaurantSchema);
mongoose.model('Review', ReviewSchema);