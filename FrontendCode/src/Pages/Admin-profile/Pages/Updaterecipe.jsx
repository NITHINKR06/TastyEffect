import React, { useEffect, useState } from 'react'
import EditRecipe from './EditFile'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';

export default function Updaterecipe() {

  let params = useParams();
  //   console.log(params);
  let recipeId = params.id;
  // console.log(recipeId);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getRecipeId/" + recipeId)
      .then((response) => {
      //  console.log(response.data.recipe)
        setSelectedRecipe(response.data.recipe);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(selectedRecipe);

  return (
    <div style={{
      backgroundColor: "#FAACA8",
      backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)"
    }}>
      <div style={{marginLeft:'50px'}}>
      <Link to={'/adminProfile'}><Button variant="outlined" color="success">Goto home</Button></Link>
      <h1 style={{ 
          fontSize: 'calc(1rem + 1.5vw)',
          fontWeight: '700',
          background: 'linear-gradient(to right, #803bec 30%, #1b1b1b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          paddingTop:'50px',
          marginBottom:'-70px'
      }}>Update the recipe Details</h1>
        <EditRecipe
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        />
    </div>
    </div>
  )
}
