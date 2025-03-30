// Assume a MongoDB schema using Mongoose

const mongoose = require('mongoose');
// Define schema for the recipe
const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true
  },
  recipeDiscription: {
    type: String,
    required: true
  },
  recipeTime: {
    type: Number,
    required: true
  },
  recipeRating: {
    type: Number,
    required: true
  },
  recipeIngrident: [{
    type: String
  }],
  recipeSteps: [{
    type: String
  }],
  recipeVedioLink: {
    type: String
  },
  profile: {
    type: String
  }
});

// Create a model using the schema
const Recipe = mongoose.model('Saved_Recipe', recipeSchema);

module.exports = Recipe;
