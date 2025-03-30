// reviews_controller.js

const Comment = require('../Models/UserComments');

// Controller for getting all comments for a recipe
exports.getAllCommentsForRecipe = async (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId)
    try {
        const comments = await Comment.find({ recipeId });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller for adding a new comment for a recipe
exports.addCommentForRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const { rating, fullName, email, comments } = req.body;
    const newComment = new Comment({
        recipeId,
        rating,
        fullName,
        email,
        comments
    });
    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
