const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
    InsertRecipes, getAllRecipe, getRecipeByName, updateRecipe,getRecipeById, viewRecipeById, deleteRecipeById
  } = require("../controllers/recipe_controller");

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
  
  router.post("/insertRecipe",  upload.single("profile"), InsertRecipes);
  router.get("/getAllRecipes", getAllRecipe);
  router.get("/getRecipe/:name", getRecipeByName);
  router.put("/updateRecipe/:id", upload.single("profile"), updateRecipe);
  router.get("/getRecipeId/:id", viewRecipeById);
  router.delete("/deleterecipe/:id", deleteRecipeById);


  module.exports = router;