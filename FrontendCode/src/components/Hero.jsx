import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Box, Button, Divider, Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import food from '../assets/hero/vecteezy_beef-soup-png-transparent_22983446.png'
import man from '../assets/hero/vecteezy_ai-generated-disapproving-chef-character-isolated-on_36083518.png'

import img1 from '../assets/recipe1.jpg';
import img2 from '../assets/recipe2.jpg';
import img3 from '../assets/recipe2.jpg';
import img4 from '../assets/images/pexels-ash-376464.jpg';

import slide1 from '../assets/images/pexels-valeria-boltneva-1199957.jpg';
import slide2 from '../assets/images/pexels-lumn-568370.jpg';
import slide3 from '../assets/images/pexels-abhinav-goswami-291528 (1).jpg';

import images1 from '../assets/images/pexels-valeria-boltneva-1199957.jpg';
import images2 from '../assets/images/pexels-foodie-factor-566566.jpg';
import images3 from '../assets/images/pexels-lumn-568370.jpg';
import images4 from '../assets/images/pexels-keegan-evans-90893.jpg';
import images5 from '../assets/images/pexels-valeria-boltneva-1199957.jpg';
import images6 from '../assets/images/pexels-valeria-boltneva-1833349.jpg';

import './HeroStyles.css';
import axios from 'axios';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import proImage from '../assets/hero/Screenshot 2024-03-23 100746.png'
import pose1 from '../assets/hero/vecteezy_ai-generated-color-full-veggie-wrap-isolated-on-png-background_39113486.png'
import pose2 from '../assets/hero/vecteezy_three-vegetables-tortillas-ai-generated_23961395.png'
import pose3 from '../assets/hero/vecteezy_ai-generated-grilled-fish-with-vegetable-salad-onion-and_36083351.png'
import pose4 from '../assets/hero/vecteezy_beef-soup-png-transparent_22983446.png'
import pose5 from '../assets/hero/vecteezy_autumn-element-watercolor-ornament_13179763.png'

// vecteezy_professional-3d-butcher-cute-girl-with-knife-and-meat_22484415.png
// vecteezy_ai-generated-color-full-veggie-wrap-isolated-on-png-background_39113486.png



import SearchRecipes from '../Pages/Recipes/SearchRecipe/SearchRecipes'

export default function Hero({ bgColor }) {


  
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

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const slideData = [
    {
      image: slide1,
    },
    {
      image: slide2,
    },
    {
      image: slide3,
    },
  ];

  const cardData = [
    {
      url: '/allrecipe/',
      image: img1,
      title: '',
      body: 'The crispiest air fryer tofu – in 15 minutes! Extremely easy, incredibly versatile, and an absolute weeknight go-to.',
    },
    {
      url: '/shop',
      image: img2,
      title: '',
      body: 'The crispiest air fryer tofu – in 15 minutes! Extremely easy, incredibly versatile, and an absolute weeknight go-to.',
    },
    {
      url: '/shop',
      image: img3,
      title: '',
      body: 'The crispiest air fryer tofu – in 15 minutes! Extremely easy, incredibly versatile, and an absolute weeknight go-to.',
    },
    {
      url: '/shop',
      image: img4,
      title: '',
      body: 'The crispiest air fryer tofu – in 15 minutes! Extremely easy, incredibly versatile, and an absolute weeknight go-to.',
    },
  ];

  const categories = [
    { name: 'Veg Recipes', link: '/allrecipe/vegitem', image: images1 },
    { name: 'NonVeg Recipes', link: '/allrecipe', image: images2 },
    { name: 'Snaks', link: '/allrecipe', image: images3 },
    { name: 'Dinner', link: '/allrecipe', image: images4 },
    { name: 'Breakfast', link: '/allrecipe', image: images5 },
    { name: 'Lanch', link: '/allrecipe', image: images6 },
  ];

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

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/recipe/getAllRecipes")
      .then((response) => {
        // console.log("Received recipes data:", response.data.recipes);
        // Shuffle the recipes array
        const shuffledRecipes = response.data.recipes.sort(() => Math.random() - 0.2);
        // Slice the first 4 elements to display
        setRecipes(shuffledRecipes.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);
  
  


  return (
    <div className='mainhome'  >
      <div style={{ paddingTop:'66px', marginBottom:'150px'}} className="slide">

      <div className="home" style={{justifyContent:'left', display: 'grid' }}>
        <div className='name' style={{  marginLeft: '180px' }}>
          <h2 className='homefont1'> Discover Simple, </h2>
          <h2 className='homefont'> Delicious and </h2>
          <h2 className='homefont11'> Fast Recipes ! </h2>
        <h2 className='homefont2'> Make it delicious. Make it now.</h2>
        </div>
          <Link to={'/allrecipe'}>
            <Button variant='outlined' sx={{marginTop:'-250px', marginLeft:'330px'}}>Read More</Button>
          </Link>
      </div>

      {/* <div style={{marginLeft:'88px'}}>
        hii
      </div> */}

      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'50px'
        }}
      >
        <p className="style1">SIMPLE RECIPES MADE FOR </p>&nbsp; &nbsp;
        <p className="style2">real, actual, everyday life.</p>
      </div>

      <Swiper
        pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {slideData.map((card, index) => (
          <SwiperSlide key={index}>
            <div style={{ width: '100%', height: '100%' }}>
              <img src={card.image} alt={`Recipe ${index + 1}`} style={{ width: '120%', height: '100%', objectFit: 'cover' }}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>



      <div className='Search' style={{display:'flex', marginTop:'150px', marginLeft:'5px',  marginBottom:'90px', justifyContent:'space-around', alignItems:'center'}}>
        
        <div /* className='SearchBox' */ style={{display:'flex' , cursor:'pointer' , marginLeft:'-450px', marginTop:'-30px'}} onClick={handleOpen}>
          {/* <SearchIcon sx={{fontSize:'35px'}}/>
          <h1>Search Recipes... </h1> */}

          <SearchRecipes/>
        </div>
        <div style={{marginLeft:'-350px', marginRight:'-250px', }}>
          <h1 style={{fontFamily:'Papyrus', fontSize:35}}>or</h1>
        </div>
        <div style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}>
          <Link to={'/allrecipe/viewallrecipe'}>
            <Button  variant='contained' sx={{height:'55px', width:'250px', marginLeft:'-115px'}}>+ View All Recipes</Button>
          </Link>
        </div>
        {/* <Modal
          open={openDiv}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='sBox'
          >
          <Box sx={style}>

          </Box>
          </Modal> */}
      </div>

      <div className='catogry' style={{ display: 'flex', gap: '35px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: '35px', marginBottom:'90px' }}>
      {categories.map((category, index) => (
        <Link to={category.link} key={index}>
          <div className='types' style={{ objectFit: 'contain', gap: '20px' }}>
            <img src={category.image} alt="" style={{ height: '140px', width: '140px', borderRadius: '50%' }} />
            <h2 style={{fontFamily:'Papyrus', fontSize:20, fontWeight:900, marginTop:10}}>{category.name}</h2>
          </div>
        </Link>
      ))}
      </div>

      <div className='lines'  style={{marginLeft:'450px', justifyContent:'center', alignItems:'center',marginTop:'40px', height:'150px', width:'450px'}}>
        <h5 >Don't trust what you see, even salt looks like sugar 
          <Box sx={{display:'flex', mt:-20,ml:48, position:'absolute', overflow:'auto', position:'absolute'}} >
            <img src={man} alt="" style={{height:'190px'}}/>
          </Box>
        </h5>
      </div>

      <div className="Card" style={{ display: 'flex', columnGap: '10px', justifyContent:'center', alignItems:'center' }}>
        {cardData.map((card, index) => (
          <Link to={card.url}>
            <div className={`card ${index === 0 || index === 2 ? 'customs-class' : ''}`} style={{ backgroundImage: `url(${card.image})`, displa:'grid',marginBottom:'90px' }}>
              <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <Divider sx={{ my: 2 }} />
                <p className="card-body">{card.body}</p>
                <Divider sx={{ my: 2 }} />
                Learn More
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="Card" style={{ display: 'flex', gap: '10px', justifyContent:'center', alignItems:'center' }}>
      {recipes.map((recipe, index) => (
        <div key={index} className={`card ${index === 1 || index === 3 ? 'custom-class' : ''}`} style={{ backgroundImage: `url(http://localhost:7000/uploads/recipe/${recipe.profile})`, display:'grid',marginBottom:'50px' }}>
          <div className="card-content">
            <h2 className="card-title">{recipe.recipeName}</h2>
            <Divider sx={{ my: 2 }} />
            <p className="card-body">
              <Rating name="recipe-rating" value={recipe.recipeRating} readOnly />
              {/* <h2 className="">{recipe.recipeDiscription}</h2> */}
            </p>
            <Divider sx={{ my: 2 }} />
            <Link to={'/allrecipe/viewallrecipe'}>
              <Button variant='outlined' > Learn More</Button>
            </Link>
            <h6>................................................................................</h6>
          </div>
        </div>
      ))}
    </div>
      </div>
      {/* <div className="image-slider" >
      <div className="slider-container" >
        <div className="slider move-right-to-left"style={{gap:'100px'}}>
          <img src={pose1} alt="" style={{ height: '100px' }} />
          <img src={pose2} alt="" style={{ height: '100px' }} />
          <img src={pose3} alt="" style={{ height: '100px' }} />
          <img src={pose4} alt="" style={{ height: '100px' }} />
          <img src={pose5} alt="" style={{ height: '100px' }} />
        </div>
      </div>
      <div className="slider-container" >
        <div className="slider move-left-to-right" style={{gap:'100px'}}>
          <img src={pose1} alt="" style={{ height: '100px' }} />
          <img src={pose2} alt="" style={{ height: '100px' }} />
          <img src={pose3} alt="" style={{ height: '100px' }} />
          <img src={pose4} alt="" style={{ height: '100px' }} />
          <img src={pose5} alt="" style={{ height: '100px' }} />
        </div>
      </div>
    </div> */}

      <Box sx={{position: 'relative', p: 10, }}>
       <h1 style={{fontSize:'25px', fontFamily:'Anta, sans-serif', marginBottom:'10px'}}> Click on below to become a member<ArrowCircleDownIcon/></h1>
    <Link to={'https://www.foodbloggerpro.com/'} target='_blank'>
        <img src={proImage} alt="" onContextMenu={(e) => e.preventDefault()} />
    </Link>
      </Box>

    </div>
  );
}
