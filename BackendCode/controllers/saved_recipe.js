// recipeController.js

const Recipe = require('../Models/SavedRecipe');

// Controller function to get all recipes
exports.getAllSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error getting recipes', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.saveRecipe = async (req, res) => {
  try {
    const { recipeId, recipeName, recipeTime, recipeDescription, recipeReview, recipeRating, recipeVideoLink } = req.body;
    const profile = req.file?.filename;
    const { recipeIngredient, recipeSteps } = req.body;

    // Check if recipeName is undefined
    if (!recipeName) {
      return res.status(400).json({ error: "recipeName is required" });
    }

    let checkRecipe = await Recipe.findOne({ recipeId: recipeId });
    if (checkRecipe) {
      console.log("Recipe already exists!");
      return res.json({ message: "Recipe already exists!" });
    } else {
      let newRecipe = await new Recipe({
        recipeId,
        profile,
        recipeName,
        recipeTime,
        recipeDescription,
        recipeVideoLink,
        recipeIngredient,
        recipeSteps,
        recipeReview,
        recipeRating,
      });
      let savedRecipe = await newRecipe.save();
      console.log("Recipe saved successfully");
      return res.status(201).json({
        success: true,
        message: "Recipe saved successfully",
        admin: savedRecipe,
      });
    }
  } catch (err) {
    console.log("Error occurred on saving recipes", err);
    return res.status(500).json({ error: err });
  }
};
