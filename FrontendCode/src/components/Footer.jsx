import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Divider } from '@mui/material';
// import img from '../assets/Tasty Effect (1).png'
import img from '../assets/hero/vecteezy_woman-cooking-food_24524034.png'


import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import './FooterStyles.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const logoStyle = {
  width: '240px',
  height: '180px',

};

export default function Footer() {
  
  const [email, setEmail] = React.useState('');
  const [refreshButton, setRefreshButton] = React.useState(false);
  const navigate = useNavigate(); // Ensure useNavigate is available within a functional component

  
  const handleInsert = () => {
    if (!email) {
      toast.warning("Please fill out field");
      return; 
    }
    axios.post("http://localhost:7000/api/userresponse/addresponse", { email: email })
      .then(async (response) => {
        
        // console.log(response, 'added to database');
        toast.success('Your request sent Successfully ')
        await navigate("/");
        setEmail('')
      })
      .catch((error) => {
        console.log(error);
        toast.error('Not valide response')
      });
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className='footers'>
      {/* <Divider/>
      <Divider/> */}

      <Box sx={{ width: { xs: '100%', sm: '100%' } , display:'flex', justifyContent:'center', gap:20}}>
        <Box sx={{ ml: '-10px' ,display:'flex', alignItems:'center', pr:40, mr:20}}>
              <img
                src={img}
                style={logoStyle}
                alt="logo of sitemark"
                onContextMenu={(e) => e.preventDefault()}
              />
              <h1 style={{  fontFamily: ' Papyrus', fontSize:'30px', fontWeight:'900'}}>Tasty Effect</h1>
        </Box>
            <div className="contact-info" style={{marginTop:'20px',marginLeft:'-400px', width:'auto', justifyContent:'center', alignItems:'center'}}>
          <h1 style={{marginLeft:'-100px',fontSize:'20px'}}><Typography variant="body" fontWeight={600} sx={{}} gutterBottom>
                Social Media
              </Typography></h1>
          <p style={{marginLeft:'-50px'}}>Connect with us on social media for the latest updates, recipes, and more!</p>
          <div style={{display:'flex', marginLeft:50}}>
          
            <Link to={'https://web.whatsapp.com/'} target='_blank'><h1><WhatsAppIcon/>&nbsp;&nbsp;Whatsapp</h1></Link>&nbsp;&nbsp;
            <Link to={'https://www.instagram.com/__nithin_poojar_/'} target='_blank'><h1><InstagramIcon/>&nbsp;&nbsp;Instagram</h1></Link>&nbsp;&nbsp;
            <Link to={'https://github.com/NITHINKR06'} target='_blank'><h1><GitHubIcon/>&nbsp;&nbsp;GitHub</h1></Link>
          
          </div>
        </div> 
        
      </Box><br/>
      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Box sx={{mt:-5, ml:-10, }}>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                onChange={handleChange}
                id="email"
                name='email'
                value={email}
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autocomplete: 'on',
                  ariaLabel: 'Enter your email address',
                }}
              />
            <Button key={refreshButton} onClick={handleInsert} variant="contained" color="primary" sx={{ flexShrink: 0 }}>
              Subscribe
            </Button>
          </Stack>
        </Box>
        <div className="contact-info" style={{marginTop:'-35px', paddingLeft:'200px', width:'750px'}}>
          <div className="contact-info">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <p>Before reaching out, be sure to check our FAQs page for answers to common questions.</p>
          </div>
          <Link to={'/FAQs'}>
            <Button variant='outlined'>
              View Faq Pages
            </Button>
          </Link><br/><br/>
        </div>
        
      </Box>
    </div>
  );
}
