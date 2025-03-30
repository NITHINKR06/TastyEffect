import { Box, Button, Grid, Modal } from '@mui/material'
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import './shopping.css';
import { useEffect } from 'react'; 
import '../Pages/User-profile/pages/Profile.css'
import image from '../assets/hero/vecteezy_modern-3d-chef-with-tablet-ideal-for-online-cooking-classes_22483316.png';
import img from '../assets/pngwing.com (3).png';
import img1 from '../assets/pngwing.com (4).png';
import img2 from '../assets/pngwing.com (7).png';
import img3  from '../assets/images.png';
import MyRecipePage from '../Pages/Recipes/Pages/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 25,
  p: 6,
};

export default function Shopping() {
  const [open, setOpen] = useState(false);
  const [buttonData, setButtonData] = useState({});
  const [clickCounts, setClickCounts] = useState({
    Amazon: 500,
    Etsy: 780,
    Flipkart: 310,
  });

  const handleOpen = (data) => {
    setButtonData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Increment click count when buttonData changes
    if (buttonData.shop) {
      setClickCounts(prevCounts => ({
        ...prevCounts,
        [buttonData.shop]: prevCounts[buttonData.shop] + 1,
      }));
    }
  }, [buttonData]);

  return (
    <div className='shop'>
       <Grid>
       {/* <div className='my-recipe-page'> */}
        {/* </div> */}

            <Box sx={{mt:9, }}>
                <h1 className='header'>Shop the Recipe Books on the Below Links</h1>
                <div className='' style={{display:'flex'}}>
                  <img src={image} alt="" style={{height:'450px', width:'450px', marginRight:'-430px', marginLeft:'180px', marginTop:'70px', overflow:'clip', position:'absolute'}}/>
                  <div className='buttons'>
                    <Button
                      variant='contained'
                      sx={{ width: '150px' ,mt:'40px'}}
                      onClick={() => handleOpen({ shop: 'Amazon', link: 'https://www.amazon.in/Recipe-Books/s?k=Recipe+Books', image: img1 })}
                    >
                      Shop on Amazon 
                    </Button>

                    
                    <Button
                      variant='contained'
                      sx={{ width: '150px' , marginLeft:'-35px'}}
                      onClick={() => handleOpen({ shop: 'Etsy', link: 'https://www.etsy.com/in-en/market/recipe_book', image: img2 })}
                    >
                      Shop on Etsy 
                    </Button>

                    <Button
                      variant='contained'
                      sx={{ width: '150px' , marginLeft:'-35px'}}
                      onClick={() => handleOpen({ shop: 'Flipkart', link: 'https://www.flipkart.com/search?q=recipe+book&sid=bks&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_7_na_na_na&as-pos=1&as-type=RECENT&suggestionId=recipe+book%7CBooks&requestId=af7f8c7f-0799-450e-9a32-c8995e0ce952&as-backfill=on', image: img3 })}
                    >
                      Shop on Flipkart 
                    </Button>
                    
                    

                    <Modal
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="keep-mounted-modal-title"
                      aria-describedby="keep-mounted-modal-description"
                    >
                      <Box sx={style}>
                        <img src={buttonData.image} alt="" />
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                          {/* {buttonData.shop} */}
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 5, ml:8 }}>
                          <a href={buttonData.link} target='_blank' rel='noopener noreferrer' style={{display:'flex'}}>
                          <h1 style={{fontSize:'30px', fontWeight:'600', fontFamily:'Anta, sans-serif'}}> Visit&nbsp;{buttonData.shop}</h1>

                          </a>
                        </Typography>
                      </Box>
                      
                    </Modal>
                    {/* <h1>Total User Visited&nbsp;({clickCounts.Amazon})</h1>
                    <h1>Total User Visited&nbsp;({clickCounts.Flipkart})</h1>
                    <h1>Total User Visited&nbsp;({clickCounts.Etsy})</h1> */}
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center',gap:10, paddingTop:'50px'}}>
                     
                      <img src={img1} alt="" style={{height:'50px', width:'50px'}}/>{clickCounts.Amazon}
                      <img src={img2} alt="" style={{height:'50px', width:'50px'}}/>{clickCounts.Etsy}
                      <img src={img3} alt="" style={{height:'50px', width:'50px', borderRadius:'50%'}}/>{clickCounts.Flipkart}
                    </div>
                  </div>
                  <div className='image'>
                    <img src={img} alt="Image of Books" style={{height:'200px', width:'200px'}}/>
                  </div>
                </div>  
                
            </Box>
       </Grid>
       {/* <MyRecipePage style={{position: 'fixed',
          bottom: '20px',
          left: '100%',
          // transform: 'translateX(-50%)',
          backgroundColor: '#fff', // Set the background color as needed
          padding: '10px', // Adjust padding as needed
          borderRadius: '5px', // Adjust border radius as needed
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for better visibility
          zIndex: 9999,}}/> */}
    </div>
  )
}
