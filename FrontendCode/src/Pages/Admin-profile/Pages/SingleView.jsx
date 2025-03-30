import React, { useState } from 'react';
import YouTube from 'react-youtube';
import '../../Recipes/loaded.css';
import { Button, Rating } from '@mui/material';

export default function SingleView({ selectedStudent }) {
  
  const videoId = selectedStudent.recipeVedioLink ? selectedStudent.recipeVedioLink.split('v=')[1] : null;
  // console.log(videoId)

  // Construct the full YouTube URL
  const fullVideoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);

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
        <p className='rTime' style={{ display: 'flex', gap: '8px' }}>Time: <h1 className='rTimes'>{selectedStudent.recipeTime} minutes</h1></p>
        <div style={{ display: 'flex', justifyContent:'left', textAlign:'center'  }}>
          <p className='rRating' style={{marginTop:'10px'}}>Rating:  </p> &nbsp;&nbsp;
          <Rating
            name="recipe-rating"
            value={selectedStudent.recipeRating}
            readOnly
            sx={{pt:1}}
          />
        </div>
      </div>
      <h1 className='rName'>{selectedStudent.recipeName}</h1>
      <p className='rDis'>Description: {selectedStudent.recipeDiscription}</p>
      <div style={{ display: 'flex', gap: '' }}>
        <div style={{marginRight:'-50px', paddingRight: ''}}>
          <img className='img' src={`http://localhost:7000/uploads/recipe/${selectedStudent.profile}`} alt="Recipe" style={{ height: '400px', width: '400px', marginRight: '15px', marginBottom: '15px', marginLeft:'170px' }} />
          <h2 className='rIngrident'>Ingredients:</h2>
          <ul className='rIngridents'>
            {selectedStudent.recipeIngredient.map((ingredient, index) => (
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
            {selectedStudent.recipeSteps.map((step, index) => (
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
      <h1 style={{fontSize:'25px',fontFamily:'Anta, sans-serif', marginLeft:'170px', marginBottom:'10px', color:'blue'}}>Vedio Is Available</h1>
        {videoId ? (
          <YouTube
            videoId={videoId} // Pass the extracted video ID as prop
            opts={{ width: '560', height: '315'}} // Optional: Set width and height
          />
        ) : (
          <p>Video not available</p>
        )}
      </div>
    </div>
  );
}
