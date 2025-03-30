import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from '../listItems';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import {Card , CardContent, Button, Box, Modal, Rating, Input,  InputLabel, FormControl, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import './Savedrecipe.css'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: "25px",
};

const RecipeCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,

  margin: "10px",
}));

const RecipeCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));


export default function Saveditems() {
  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to keep track of selected recipe for viewing
  const [openViewSingle, setOpenViewSingle] = useState(false);
  const [alreadySavedMessage, setAlreadySavedMessage] = useState(false); // State to toggle already saved message

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('savedRecipes');
    if (storedData) {
      // Parse the data if it exists
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []); // Empty dependency array to run only once on component mount
  
  const handleCloseViewSingle = () => {
    setOpenViewSingle(false);
    setSelectedRecipe(null); // Reset selected recipe
  };

  const handleOpenViewSingle = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenViewSingle(true);
  };

  const handleDeleteRecipe = (recipeId) => {
    const recipeIndex = data.findIndex(recipe => recipe.recipeId === recipeId);
    if (recipeIndex !== -1) {
      const updatedData = [...data.slice(0, recipeIndex), ...data.slice(recipeIndex + 1)];
      setData(updatedData);
      localStorage.setItem('savedRecipes', JSON.stringify(updatedData));
    } else {
      console.log('Recipe not found with the given ID');
      // Display a message or take any other action
    }
  };
  
  
  return (
    <div className='Savedrecipe' style={{
      backgroundColor: '#FFDEE9',
      // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
      height:'100vh',
      justifyContent:'center',
      alignItems:'center',
      padding:'20px'
    }}>
      <Box sx={{bgcolor:'white',borderRadius:6}}>
        <Toolbar sx={{ml:0 }}>
          <Link to={'/'} >
            <Box sx={{display: 'flex', ml:3 , mr:-10, alignItems:'center', }}>
              <h1 style={{ '&:hover': { backgroundColor: '#e0e0e0' }}}>Back To home</h1>
              <IconButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
                <ChevronLeftIcon sx={{ color: 'blue' }} />
              </IconButton>
            </Box>
          </Link>
          <Box sx={{display: 'flex',width:'900px', ml:50 }}>
            {mainListItems}
            {secondaryListItems}
          </Box>
        </Toolbar>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 , ml:30 }}>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RecipeCard key={item._id} style={{ justifyContent: "center", alignItems: "center" }}>
                <RecipeCardContent >
                  <div>
                    <img src={`http://localhost:7000/uploads/recipe/${item.profile}`} alt="Profile" style={{ width: "200px", height: "200px" }} />
                    <p style={{margin:'15px'}}>
                      <h1 className="reName" style={{fontFamily:'Anta, sans-serif', fontSize:'23px'}}>{item.recipeName}</h1>
                    </p>
                    <Button onClick={() => handleOpenViewSingle(item)} variant="outlined" color="success">
                      View
                    </Button>
                    <Button onClick={() => handleDeleteRecipe(item.recipeId)} variant="outlined" color="error">
                      Delete
                    </Button>
                  </div>
                </RecipeCardContent>
              </RecipeCard>
            </Grid>
          ))}

          <Modal
            open={openViewSingle}
            onClose={handleCloseViewSingle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  
                  <Button onClick={handleCloseViewSingle} variant="outlined" color="error" fullWidth>
                    Close
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </div>
  );
}
