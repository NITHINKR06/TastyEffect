import React from "react";

const LoadedRecipe = ({ recipe }) => {
  return (
    <div>
      <div>
        <h2>{recipe.recipeName}</h2>
        <p>Rating: {recipe.recipeRating}</p>
        <p>Description: {recipe.recipeDiscription}</p>
        {/* Add other recipe details here */}
      </div>
    </div>
  );
};

export default LoadedRecipe;
