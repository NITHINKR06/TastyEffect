const recipeSchema = require("../Models/recipe");

const InsertRecipes = async (req, res) => {
  try {
    const { recipeId, recipeName, recipeTime, recipeDiscription, recipeReview, recipeRating, recipeVedioLink } = req.body;
    const profile = req.file?.filename;
    const { recipeIngredient, recipeSteps } = req.body;
    console.log(recipeVedioLink)
    // console.log(recipeSteps)
    // const re=recipeIngredient.map((data)=>data)
    // Check if recipeName is undefined
    // console.log(re)
    if (!recipeName) {
      return res.status(400).json({ error: "recipeName is required" });
    }

    let checkRecipe = await recipeSchema.findOne({ recipeId: recipeId });
    if (checkRecipe) {
      console.log("Recipe already exists!");
      return res.json({ message: "Recipe already exists!" });
    } else {
      let newRecipe = await new recipeSchema({
        recipeId,
        profile,
        recipeName,
        recipeTime,
        recipeDiscription,
        recipeVedioLink,
        recipeIngredient:recipeIngredient,
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

const getAllRecipe = async (req, res) => {
  try {
    let recipes = await recipeSchema.find();
    console.log("Recipe information fetched from database");
    res.json({ message: "All recipes information fetched from database", recipes });
  } catch (error) {
    console.error("Error occurred while fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRecipeByName = async (req, res) => {
  const recipeName = req.params.name;

  try {
    const recipe = await recipeSchema.findOne({ recipeName });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("Recipe found:", recipe);
    res.json({ message: "Recipe found", recipe });
  } catch (error) {
    console.error("Error occurred while fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let recipe = await recipeSchema.findById(req.params.id);
    if (!recipe) {
      console.log("Recipe not found with this ID!");
      return res.status(404).json({ message: "Recipe not found with this ID!" });
    }
    
    const { recipeId, recipeName, recipeTime, recipeDiscription, recipeReview, recipeRating, recipeVedioLink } = req.body;
    const profile = req.file?.filename;
    const { recipeIngredient, recipeSteps } = req.body;

    let updateRecipe = {};
    if (recipeId) {
      updateRecipe.recipeId = recipeId;
    }
    if (recipeName) {
      updateRecipe.recipeName = recipeName;
    }
    if (recipeTime) {
      updateRecipe.recipeTime = recipeTime;
    }
    if (recipeDiscription) {
      updateRecipe.recipeDiscription = recipeDiscription;
    }
    if (recipeReview) {
      updateRecipe.recipeReview = recipeReview;
    }
    if (recipeRating) {
      updateRecipe.recipeRating = recipeRating;
    }
    if (recipeVedioLink) {
      updateRecipe.recipeVedioLink = recipeVedioLink;
    }
    if (recipeIngredient) {
      updateRecipe.recipeIngredient = recipeIngredient;
    }
    if (recipeSteps) {
      updateRecipe.recipeSteps = recipeSteps;
    }
    if (profile) {
      updateRecipe.profile = profile;
    }

    const updatedRecipe = await recipeSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateRecipe },
      { new: true }
    );

    console.log("Recipe details updated successfully");
    res.json({ message: "Recipe details updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Error updating recipe" });
  }
};


const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await recipeSchema.findOne({ recipeId });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    console.log("Recipe found:", recipe);
    res.json({ message: "Recipe found", recipe });
  } catch (error) {
    console.error("Error occurred while fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewRecipeById = async (req, res) => {
  try {
    // Extract the recipe ID from the request parameters
    const { id } = req.params;

    // Find the recipe in the database by its ID
    const recipe = await recipeSchema.findById(id);

    // If the recipe is not found, return a 404 Not Found response
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // If the recipe is found, return it in the response
    res.json({ message: "Recipe found", recipe });
  } catch (error) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    console.error("Error occurred while fetching recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    // Extract the recipe ID from the request parameters
    const { id } = req.params;

    // Find the recipe in the database by its ID and delete it
    const deletedRecipe = await recipeSchema.findByIdAndDelete(id);

    // If the recipe is not found, return a 404 Not Found response
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // If the recipe is deleted successfully, return a success message
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    // If an error occurs during the process, return a 500 Internal Server Error response
    console.error("Error occurred while deleting recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  InsertRecipes,
  getAllRecipe,
  getRecipeByName,
  updateRecipe,
  getRecipeById,
  viewRecipeById,
  deleteRecipeById
};
