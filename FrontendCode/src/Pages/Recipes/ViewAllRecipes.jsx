import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {Card , CardContent, Button, Box, Modal, Rating, Input,  InputLabel, FormControl, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import Navbarhome from "./Navbar";
import Footers from "../../components/Footer";
import LoadedRecipe from "./loadedrecipe";
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@mui/material/Pagination";
import CommentIcon from '@mui/icons-material/Comment';
import Comments from "./Pages/Comments";
import './viewallrecipe.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

const ViewAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openViewSingle, setOpenViewSingle] = useState(false);
  const [openViewComments, setOpenViewComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedRecipeForComments, setSelectedRecipeForComments] = useState(null);
  const recipesPerPage = 9; // Number of recipes to display per page
  const scrollThreshold = 200; // Threshold to start loading more recipes before reaching the bottom
  console.log(selectedRecipeForComments, ' is selected recipe to comment on it')
  const navigate = useNavigate();
  const bottomOfListRef = useRef(null);
  
  const handleComments = (recipe) => {
    setSelectedRecipeForComments(recipe);
    setOpenViewComments(true);
  };
  

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getAllRecipes")
      .then((response) => {
        setRecipes(response.data.recipes);
        // console.log(response.data.recipes)
        const shuffledRecipes = response.data.recipes.sort(() => Math.random() - 0.2);
        // Slice the first 4 elements to display
        setRecipe(shuffledRecipes.slice(0, 4));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSaveRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem("token");
  
      if (token) {
        const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
        const existingRecipeIndex = savedRecipes.findIndex(savedRecipe => savedRecipe.recipeId === recipe.recipeId);
  
        if (existingRecipeIndex === -1) {
          savedRecipes.push(recipe);
          localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
          console.log("Recipe saved successfully!");
        } else {
          console.log("Recipe with the same ID already exists in saved recipes.");
        }
      } else {
        navigate('/usersignup')
        console.log("Token not available. User must be logged in to save recipes.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };
  
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

  const filteredRecipes = currentRecipes.filter(recipe =>
    recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseViewSingle = () => setOpenViewSingle(false);
  const handleOpenViewSingle = (recipe) => {
    setOpenViewSingle(true);
    setSelectedRecipe(recipe);
  };
  
  const handleCloseComments = () => setOpenViewComments(false);
  // const handleComments = () => {
  //   setOpenViewComments(true);

  // };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [openDiv, setOpenDiv] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // const navigate = useNavigate();  

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
    setOpenDiv(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setSelectedCard(null);
    setOpen(false);
    setOpenDiv(false);
    
};


  return (
    <div className="viewAllRecipe">
      <Navbarhome />
      <div className='searchbox' style={{marginTop:'30px',width:'39%', justifyContent:'center', alignItems:'center', paddingLeft:'100px'}}>
          <div className='SearchBox' style={{display:'flex' , cursor:'pointer', width:'550px',  height:'60px', justifyContent:'center', alignItems:'center', borderRadius:'5px', position:'relative'}} onClick={handleOpen}>
            <SearchIcon sx={{fontSize:'35px'}}/>
            <h1 style={{fontFamily:'Papyrus', fontWeight:800, marginLeft:'10px'}}>Search Recipes... </h1>
          </div>
          <Modal
          open={openDiv}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='sBox'
          >
          <Box sx={styles}>
            <SearchIcon sx={{ fontSize: '35px', gap: '20px' , marginLeft:'350px', marginRight:'25px'}} />
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
            {console.log("Number of filtered recipes:", filteredRecipes.length)}
            <div style={{justifyContent:'center', alignItems:'center', textAlign:'center',marginTop:'25px', marginBottom:'10px'}}>
              <h1 style={{marginLeft:'-750px', fontSize:'20px', fontWeight:'500'}}>Recently Added</h1>
            <div style={{display:'flex' ,justifyContent:'center', alignItems:'center'}}>
              
              {filteredRecipes.slice(0, 4).map((recipe, index) => (
                <RecipeCard key={recipe._id} style={{ justifyContent: "center", alignItems: "center" }}>
                  <RecipeCardContent>
                    <div>
                      <img src={`http://localhost:7000/uploads/recipe/${recipe.profile}`} alt="Profile" style={{ width: "100px", height: "100px" }} />
                      <p>
                        <Rating name="recipe-rating" value={recipe.recipeRating} readOnly />
                        <h1 className="avg"> AVERAGE {recipe.recipeRating} / COMMENTS</h1>
                      </p>
                      <h3 className="reName">{recipe.recipeName}</h3>
                      <Button to={`/loadedrecipe/${recipe.recipeName}`} onClick={() => handleOpenViewSingle(recipe)} variant="outlined" color="success">
                        View
                      </Button>
                    </div>
                  </RecipeCardContent>
                </RecipeCard>
              ))}
            </div>
            <h1 className='length'>Recipe Found...&nbsp;{recipes.length}!</h1>
              </div>


          </Box>

          </Modal>
        </div>
      
      <div
      className="viewAllRecipe"
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom:'150px',
          marginBottom:'120'
        }}
      >     

<div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        marginLeft: "50px",
        width: "95%",
      }}
    >
      {recipes && recipes.map((recipe, index) => (
        <RecipeCard key={recipe._id} style={{ justifyContent: "center", alignItems: "center" }}>
          <RecipeCardContent>
            <div>
              <img src={`http://localhost:7000/uploads/recipe/${recipe.profile}`} alt="Profile" style={{ width: "200px", height: "200px" }} />
              <p style={{ margin: '10px' , textAlign:'left'}}>
                <h1 className="reName" style={{ fontFamily: 'Anta, sans-serif', fontSize: '20px' }}>{recipe.recipeName}</h1>
              </p>
              <Button onClick={() => handleOpenViewSingle(recipe)} variant="outlined" fullWidth color="success">
                View
              </Button>
              {/* <Button variant="outlined" color="primary" sx={{ marginLeft: '50px' }} onClick={() => handleComments(recipe._id)}>
                <CommentIcon />
              </Button>
              {recipe.comments && recipe.comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment.text}</p>
                </div>
              ))} */}
            </div>
          </RecipeCardContent>
        </RecipeCard>
      ))}
    </div>

        <Modal
          open={openViewSingle}
          onClose={handleCloseViewSingle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CardContent>
            <Button onClick={() => handleSaveRecipe(selectedRecipe)}>
              <FavoriteBorderIcon /> Add to Saved List
            </Button>
              {/* <Saveditems/> */}
              {selectedRecipe ? <LoadedRecipe selectedRecipe={selectedRecipe} /> : <p>No recipe selected</p>}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button onClick={handleCloseViewSingle} variant="outlined" color="error" fullWidth>
                  Close
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Modal>

        <Modal
        open={openViewComments}
        onClose={handleCloseComments}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardContent>
            {selectedRecipeForComments && <Comments selectedRecipeForComments={selectedRecipeForComments} />}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button onClick={handleCloseComments} variant="outlined" color="error" fullWidth>
                Close
              </Button>
            </Box>
          </CardContent>  
        </Box>
      </Modal>
        
      </div>

      <Footers />
    </div>
  );
};

export default ViewAllRecipes;

/* 
<Pagination
        count={Math.ceil(recipes.length / recipesPerPage)}
        variant="outlined"
        color="primary"
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff', // Set the background color as needed
          padding: '10px', // Adjust padding as needed
          borderRadius: '5px', // Adjust border radius as needed
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for better visibility
          zIndex: 9999, // Ensure it's above other content
        }}
      />
*/