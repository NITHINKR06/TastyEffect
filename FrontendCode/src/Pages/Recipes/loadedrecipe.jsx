import React, { useState } from 'react';
import './loaded.css';
import YouTube from 'react-youtube';
import { Rating } from '@mui/material';

export default function LoadedRecipe({ selectedRecipe }) {

  
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  
  if (!selectedRecipe || !selectedRecipe.recipeName) {
    return <div>Loading...</div>;
}
  const videoId = selectedRecipe.recipeVedioLink ? selectedRecipe.recipeVedioLink.split('v=')[1] : null;

  // Construct the full YouTube URL
  const fullVideoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

  const handleIngredientChange = (ingredient) => {
    const selectedIndex = selectedIngredients.indexOf(ingredient);
    let newSelectedIngredients = [...selectedIngredients];

    if (selectedIndex === -1) {
      newSelectedIngredients.push(ingredient);
    } else {
      newSelectedIngredients.splice(selectedIndex, 1);
    }

    setSelectedIngredients(newSelectedIngredients);
  };

  const handleStepChange = (step) => {
    const selectedIndex = selectedSteps.indexOf(step);
    let newSelectedSteps = [...selectedSteps];

    if (selectedIndex === -1) {
      newSelectedSteps.push(step);
    } else {
      newSelectedSteps.splice(selectedIndex, 1);
    }

    setSelectedSteps(newSelectedSteps);
  };

  return (
    <div className='Maindiv'>
      <div style={{position: '', top: '50px', right: '50px', width:'30vh', height:'15vh', overflow:''}}>
        <p className='rTime' style={{ display: 'flex', gap: '8px' }}>Time: <h1 className='rTimes'>{selectedRecipe.recipeTime} minutes</h1></p>
        <div style={{ display: 'flex' }}>
          <p className='rRating'>Rating: <Rating name="recipe-rating" value={selectedRecipe.recipeRating} readOnly /></p>
        </div>
      </div>
      <h1 className='rName'>{selectedRecipe.recipeName}</h1>
      <p className='rDis'>Description: {selectedRecipe.recipeDiscription}</p>
      <div style={{ display: 'flex', gap: '' }}>
        <div style={{marginRight:'-50px', paddingRight: ''}}>
          <img className='img' src={`http://localhost:7000/uploads/recipe/${selectedRecipe.profile}`} alt="Recipe" style={{ height: '380px', width: '380px', marginRight: '15px', marginBottom: '15px', marginLeft:'170px' }} />
          <h2 className='rIngrident'>Ingredients:</h2>
          <ul className='rIngridents'>
            {selectedRecipe.recipeIngredient.map((ingredient, index) => (
              <li key={index} style={{marginTop:'10px'}}>
                <label className={selectedIngredients.includes(ingredient) ? 'crossed' : ''}>
                  <input style={{marginRight:'15px'}} type="checkbox" name="ingredients" value={ingredient} checked={selectedIngredients.includes(ingredient)} onChange={() => handleIngredientChange(ingredient)} />
                  {ingredient}
                </label>
              </li>
            ))}
          </ul>
          <h2 className='rSteps'>Steps:</h2>
          <ul className='rStep'>
            {selectedRecipe.recipeSteps.map((step, index) => (
              <li key={index} style={{marginTop:'15px'}}>
                <label className={selectedSteps.includes(step) ? 'crossed' : ''}>
                  <input style={{marginRight:'15px'}} type="checkbox" name="steps" value={step} checked={selectedSteps.includes(step)} onChange={() => handleStepChange(step)} />
                  {step}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{marginLeft:'100px' , marginTop:'50px', marginBottom:'50px'}}>
        {videoId ? (
          <YouTube
            videoId={videoId} // Pass the extracted video ID as prop
            opts={{ width: '560px', height: '315px'}} // Optional: Set width and height
          />
        ) : (
          <p>Video not available</p>
        )}  
      </div>
      
    </div>
  );
}
