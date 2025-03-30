// routes.js

const express = require('express');
const router = express.Router();
const { getAllCommentsForRecipe, addCommentForRecipe } = require('../controllers/reviews_controller');

// Routes for comments
router.get('/getcomments/:recipeId', getAllCommentsForRecipe);
router.post('/addcomments/:recipeId', addCommentForRecipe);
// router.put('/comments/:id', editComment);
// router.delete('/comments/:id', deleteComment);

module.exports = router;
