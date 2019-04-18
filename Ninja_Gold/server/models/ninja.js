const mongoose = require('mongoose');

const NinjaSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required!'], minlength: [3, 'Name must be at least 3 characters long!']},
    gold: {type: Number, required: [true, 'Amount of starting gold required!']},
}, {timestamps: true});

mongoose.model('Ninja', NinjaSchema);