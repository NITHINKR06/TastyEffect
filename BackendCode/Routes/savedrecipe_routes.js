const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
    getAllSavedRecipes, createRecipe, deleteRecipe, saveRecipe
  } = require("../controllers/saved_recipe");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/recipeImage/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  
    router.get('/recipes', getAllSavedRecipes);
    // Route to create a new recipe
    router.post('/recipes', upload.single("profile"), createRecipe);
    router.post('/saved-recipes', upload.single("profile"), saveRecipe);
    // Route to delete a recipe by ID
    router.delete('/recipes/:id',deleteRecipe);

  module.exports = router;