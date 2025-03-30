import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { Card, CardContent } from '@mui/material';
import { styled } from "@mui/material/styles";

import LoadedRecipe from '../loadedrecipe';
import './style.css'

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height:'70%',
  marginTop:'115px',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: "25px 25px 0px 0",
};

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
  maxWidth: 345,
  margin: "10px",
}));

const RecipeCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openViewSingle, setOpenViewSingle] = useState(false);
  const [openDiv, setOpenDiv] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const recipesPerPage = 9; // Number of recipes to display per page

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getAllRecipes")
      .then((response) => {
        setRecipes(response.data.recipes); // Assuming recipes are returned as 'recipes' not 'users'
        console.log(response.data.recipes, "hiiiii");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpen = () => setOpenDiv(true);
  const handleClose = () => setOpenDiv(false);
  const handleSearchInputChange = (e) => setSearchQuery(e.target.value);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

  // Filter recipes based on search query
  const filteredRecipes = currentRecipes.filter(recipe =>
    recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseViewSingle = () => setOpenViewSingle(false);
  const handleOpenViewSingle = (recipe) => {
    setOpenViewSingle(true);
    setSelectedRecipe(recipe);
  };

  return (
    <div className='searchbox' style={{ marginTop: '30px', width: '39%', justifyContent: 'center', alignItems: 'center', paddingLeft: '100px' }}>
      <div className='SearchBox' style={{ display: 'flex', cursor: 'pointer', width: '550px', height: '60px', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', position: 'relative' }} onClick={handleOpen}>
        <SearchIcon sx={{ fontSize: '35px' }} />
        <h1 style={{ fontFamily: 'Papyrus', fontWeight: 800, marginLeft: '10px' }}>Search Recipes... </h1>
      </div>
      <div className='colorSearchBox'>
      <Modal
        open={openDiv}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='sBox'
      >
        <Box  sx={styles}>
          <SearchIcon sx={{ fontSize: '35px', gap: '20px', marginLeft: '350px', marginRight: '25px' }} />
          <Input
            placeholder='Search ..'
            value={searchQuery}
            onChange={handleSearchInputChange}
            sx={{
              cursor: 'pointer',
              width: '750px',
              height: '60px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              gap: '30px'
            }}
          />
          {/* Display filtered recipes */}
          <div  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '25px', marginBottom: '10px' }}>
            <h1 style={{ marginLeft: '-750px', fontSize: '20px', fontWeight: '500' }}>Recently Added</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              {filteredRecipes.slice(0, 4).map((recipe, index) => (
                <CardContent key={recipe._id} style={{ justifyContent: "center", alignItems: "center" }}>
                  <Card>
                    <div>
                      <img src={`http://localhost:7000/uploads/recipe/${recipe.profile}`} alt="Profile" style={{ width: "150px", height: "150px" }} />
                      <p>
                        <Rating name="recipe-rating" value={recipe.recipeRating} readOnly />
                        <h1 className="avg"> AVERAGE {recipe.recipeRating} / COMMENTS</h1>
                      </p>
                      <h3 className="reName">{recipe.recipeName}</h3>
                      <Button to={`/loadedrecipe/${recipe.recipeName}`} onClick={() => handleOpenViewSingle(recipe)} variant="outlined" color="success">
                        View
                      </Button>
                    </div>
                  </Card>
                </CardContent>
              ))}
            </div>
            <h1 className='length'>Recipe Found...&nbsp;{recipes.length}!</h1>
            <Modal
              open={openViewSingle}
              onClose={handleCloseViewSingle}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CardContent>
                  {selectedRecipe ? <LoadedRecipe selectedRecipe={selectedRecipe} /> : <p>No recipe selected</p>}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button onClick={handleCloseViewSingle} variant="outlined" color="error" fullWidth>
                      Close
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Modal>
          </div>
        </Box>
      </Modal>
        </div>
    </div>
  );
};

export default SearchRecipes;
