import React, { useEffect, useState } from 'react';
import Navbarhome from './Navbar';
import './MainPage.css'; // Import the CSS file
import { Box, Button, Divider, Input, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { GiTrophyCup } from "react-icons/gi";

import img from '../../assets/images/pexels-ash-376464.jpg'
import { Link } from 'react-router-dom';
import Footers from '../../components/Footer';
import Footer from '../../components/FootersWeb';

import SearchRecipes from '../Recipes/SearchRecipe/SearchRecipes'
import axios from 'axios';


export default function MainPage() {

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const imageStyle = {
    height:90,
    width:100,
    // borderRadius:10
  };

  const containerStyle = {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '210px',
    flexWrap: 'wrap', // Set flexWrap to wrap
    marginTop: '20px',
  };

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: '10px',
    flexBasis: '30%', // Set the width of each box to 30% (three boxes in one line)
  };

  // const [value, setValue] = React.useState(2);

  // const data = [
  //   { image: img,   name: 'Biriyani',  rating: value, },
  //   { image: img,   name: 'Kabab',     rating: value, },
  //   { image: img,   name: 'Palav',     rating: value, },
  //   { image: img,   name: 'Poori',     rating: value, },
  //   { image: img,   name: 'abc',       rating: value, },
  //   { image: img,   name: 'abc',       rating: value, },
  //   { image: img,   name: 'abc',       rating: value, },
  //   { image: img,   name: 'abc',       rating: value, },
  //   { image: img,   name: 'abc',       rating: value, },
  // ];

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getAllRecipes")
      .then((response) => {
        const sortedRecipes = response.data.users.sort((a, b) => b.rating - a.rating);
        setRecipes(sortedRecipes.slice(0, 9)); // Display only the top 9 recipes by rating
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const boxRecipe = {
    display: 'flex',
    justifyContent: 'left',
    textAlign:'center',
    alignItems:'center',
    width:'300px',
    height:'45px',
    // alignItems: 'center',
    // marginTop: '10px',
    // marginLeft:'px',
    flexBasis: '30%', // Set the width of each box to 30% (three boxes in one line)
  };

  const catogryStyle = {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'left',
    // width: '80%',
    marginLeft: '20px',
    flexWrap: 'wrap', // Set flexWrap to wrap
    marginTop: '20px',
  };

  const catogry = [
    { name : 'Breakfast',   url : '/allrecipe/breakfast' },
    { name : 'Dinner',      url : '/allrecipe/dinner' },
    { name : 'Lunch',       url : '/allrecipe/lunch' },
    { name : 'Snacks',      url : '/allrecipe/snacks' },
  ]

  const ctgySeason = [ 
    { name : 'Summner',     url : '/allrecipe/summer' },
    { name : 'Winnter',     url : '/allrecipe/winter' },
    { name : 'Rainny',      url : '/allrecipe/rainny' },  
  ]


  
  return (
    <>
      <div className='maindiv' style={{paddingBottom:'100px'}}>
      <Navbarhome />

      <div className="main-page-container">
          <div className='recipeDiv' style={{width:'100%',height:'380px', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <h1 className="main-text" >Recipes</h1>
            <div className='subtext' style={{width:'60%', height:'100px',marginLeft:'310px', marginTop:'45px', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
              <h2>We’ve organized these recipes every way we could think of so you don't have to! Dietary restrictions, weeknight dinners, meal prep recipes, some of our most tried-and-true… no matter how you browse, we’re sure you’ll find just what you were looking for.</h2>
            </div>
        </div>

        {/* ---------------------------------------------------------------------------- */}
        <div className='ab1234' style={{marginTop:'-60px'}}>
          <SearchRecipes />
        </div>
      </div>
        {/* <div className='searchbox' style={{width:'39%', justifyContent:'center', alignItems:'center'}}>
          <div className='SearchBox' style={{display:'flex' , cursor:'pointer', width:'750px',  height:'60px', justifyContent:'left', alignItems:'center', borderRadius:'5px', position:'relative'}} onClick={handleOpen}>
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
          <Box sx={style}>
            <SearchIcon sx={{fontSize:'35px', gap:'10px'}}/>
            <Input placeholder='Search ..' sx={{cursor:'pointer', width:'600px', height:'60px', justifyContent:'center', alignItems:'center', borderRadius:'5px'}}/>
          </Box>
          </Modal>
        </div> */}


       {/* ------------------------------------------------------------------------ */}


      <div /* style={{marginBottom:'150px'}} */>
        <Box sx={{ marginTop:'50px', marginBottom:'30px',display:'flex', justifyContent:'center', alignItems:'center'}}>
        <GiTrophyCup style={{fontSize:'50px'}}/>
        <h1 className='rated' style={{fontSize:'35px'}}> TOP RATED RECIPES</h1>
        </Box>
        <Box sx={{width:'45%',marginLeft:'28%', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
          <h4 style={{fontFamily:'Times New Roman', fontSize:'20px'}}>Out of all the many recipes on Pinch of Yum, these are our shining stars - the recipes we come back to again and again (and again).</h4>
        </Box>      

          {/* Recipe from the database */}
          <Box sx={containerStyle}>
          {recipes.map((item, index) => (
            <Box key={index} sx={boxStyle}>
              <img src={`http://localhost:7000/uploads/recipe/${item.profile}`} alt="Recipe" style={imageStyle} />
              <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', marginLeft: '10px', width: '250px', height: '80px' }}>
                <h3 className='recipeText'>{item.recipeName}</h3>
                <p>
                  <Rating name="disabled" value={item.recipeRating} readOnly />
                </p>
                <p style={{ fontSize: '15px', fontWeight: '800' }} className='p'>{`${item.recipeRating} REVIEWS / ${item.recipeRating} AVERAGE`}</p>
              </div>
            </Box>
          ))}
        </Box>

        <h1 className='catogry' style={{marginTop:'80px'}}>Catogry</h1>
    
        <Box sx={{paddingBottom:'150px', marginTop:'50px', width:"60%", alignItems:'center', justifyContent:'center', textAlign:'left', marginLeft:'23%'}}>
            
            <h1 style={{fontSize:'25px', fontWeight:'500'}}>Recipes By Meal Type</h1>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Box sx={catogryStyle}>
              {catogry.map((item, index) => (
                <Link to={item.url}>
                  <Box key={index} sx={boxRecipe}>
                    <ol>
                      <li type="circle" >{item.name}</li>          
                    </ol>
                  </Box>
                </Link>
              ))}
            </Box>


            <h1 style={{fontSize:'25px', fontWeight:'500', marginTop:'50px'}}>Recipes By Seasons</h1>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <Box sx={catogryStyle}>
              {ctgySeason.map((item, index) => (
                <Link to={item.url}>
                  <Box key={index} sx={boxRecipe}>
                    <ol>
                      <li type="circle" >{item.name}</li>          
                    </ol>
                  </Box>
                </Link>
              ))}
            </Box>

        </Box>
      </div>
      <div style={{justifyContent:'center', alignItems:'center', textAlign:'center', marginTop:'-50px', marginBottom:'80px', paddingBottom:'100'}}>
          <Link to={'/allrecipe/viewallrecipe'}>
            <Button  variant='contained' sx={{height:'55px', width:'250px'}}>+ View All Recipes</Button>
          </Link>
        </div>
    </div>
      <Footers/>
      {/* <Footer/> */}
    </>
  );
}
// https://react-icons.github.io/