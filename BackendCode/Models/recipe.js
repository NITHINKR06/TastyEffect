const mongoose = require("mongoose");
const { Schema } = mongoose;
const recipeSchema = new Schema({
  recipeId:{
    type: String,
  },  
  recipeName: {
    type: String,
  },
  recipeTime: {
    type: String, 
  },
  recipeDiscription: {
    type: String,
  },
  recipeVedioLink: {
    type: String,
  },
  recipeIngredient: [],
  recipeSteps: [],
  recipeReview: {
    type: String,
  },  
  recipeRating:{
    type: String,
  },
  profile:{
    type: String,
  },
},{
  timestamps: true 
});

module.exports = mongoose.model("recipes_data", recipeSchema);
