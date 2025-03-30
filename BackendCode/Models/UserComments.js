// Comment.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming you're using ObjectId to identify recipes
        ref: 'Recipe', // Reference to the Recipe model
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
