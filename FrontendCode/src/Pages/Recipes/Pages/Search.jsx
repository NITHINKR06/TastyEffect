import React, { useState, useEffect } from 'react';
import {Card , CardContent, Modal, Box, Input, Button, styled } from '@mui/material'; // Import necessary components from Material-UI
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import axios from 'axios';

const MyRecipePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [openDiv, setOpenDiv] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openViewSingle, setOpenViewSingle] = useState(false);
  const [openViewComments, setOpenViewComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const RecipeCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: "10px",
  }));
  
  const RecipeCardContent = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getAllRecipes")
      .then((response) => {
        setRecipes(response.data.users);
        const shuffledRecipes = response.data.users.sort(() => Math.random() - 0.2);
        // Slice the first 4 elements to display
        setRecipe(shuffledRecipes.slice(0, 4));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseViewSingle = () => setOpenViewSingle(false);
  const handleOpenViewSingle = (recipe) => {
    setOpenViewSingle(true);
    setSelectedRecipe(recipe);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
    setOpenDiv(true);
  };

  const handleClose = () => {
    setSelectedCard(null);
    setOpen(false);
    setOpenDiv(false);
  };

  return (
    <div className='searchbox' style={{ marginTop: '30px', width: '', justifyContent: 'center', alignItems: 'center', paddingLeft: '100px' }}>
      {/* <div className='SearchBox' style={{ display: 'flex', cursor: 'pointer', width: '550px', height: '60px', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', position: 'relative' }} onClick={handleOpen}>
      </div> */}
        {/* <h1 style={{ fontFamily: 'Papyrus', fontWeight: 800, marginLeft: '10px' }}>Search Recipes... </h1> */}
        <Box sx={{
                    borderRadius: '50%',
                    border: '2px solid lightgrey',
                    // backgroundColor: '',
                    width: '50px',
                    height: '50px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative', // Optional: Only needed if you want to specify position
                }} 
                onClick={handleOpen}>
            <SearchIcon sx={{ fontSize: '35px' , marginTop:'7px'}} />
        </Box>
      <Modal
        open={openDiv}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='sBox'
      >
        <Box sx={styles}>
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
          <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '25px', marginBottom: '10px' }}>
            <h1 style={{ marginLeft: '-750px', fontSize: '20px', fontWeight: '500' }}>Recently Added</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {filteredRecipes.slice(0, 4).map((recipe, index) => (
                <RecipeCard key={recipe._id} style={{ justifyContent: "center", alignItems: "center" }}>
                  <RecipeCardContent>
                    <div>
                      <img src={`http://localhost:7000/uploads/recipe/${recipe.profile}`} alt="Profile" style={{ width: "150px", height: "150px" }} />
                      <p>
                        <Rating name="recipe-rating" value={recipe.recipeRating} readOnly />
                        <h1 className="avg"> AVERAGE {recipe.recipeRating} / COMMENTS</h1>
                      </p>
                      <h3 className="reName">{recipe.recipeName}</h3>
                      <Button onClick={() => handleOpenViewSingle(recipe)} variant="outlined" color="success">
                        View
                      </Button>
                    </div>
                  </RecipeCardContent>
                </RecipeCard>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyRecipePage;
