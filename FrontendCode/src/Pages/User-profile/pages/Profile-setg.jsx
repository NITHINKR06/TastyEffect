import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from '../listItems';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Drawer, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from "axios";
import './ProfileStg.css';

import HomeIcon from "@mui/icons-material/Home";

export default function Profilesettg() {

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profile: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.id;

      axios.get(`http://localhost:7000/api/user/viewSingleUser/${userId}`)
        .then((response) => {
          setUser(response.data.user);
          // console.log(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // const handleChange = (event) => {
  //   setSelectedStudent({
  //     ...selectedStudent,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile: file
    });
  };

  const updateUsers = () => {
    const token = localStorage.getItem('token');

    const adminData = JSON.parse(localStorage.getItem('admin'));
    const userId = (adminData._id); 
    console.log(userId)

    // const userId = user._id;
    // console.log(userId)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };

    const formDataToUpdate = new FormData();
    formDataToUpdate.append('name', formData.name);
    formDataToUpdate.append('email', formData.email);
    formDataToUpdate.append('profile', formData.profile);
    console.log(formData?._id)

    axios.put(`http://localhost:7000/api/user/updateUser/${userId}`, formDataToUpdate, config)
      .then((response) => {
        setUser(response.data.data);
        // console.log('hii', response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='profileSetting' style={{
      backgroundColor: '#FFDEE9',
      // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
      height:'100vh',
      padding:'20px'
    }}>
      {/* <Drawer variant="permanent" >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton >
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        <List component="nav" >

          <Divider sx={{ my: 4 }} />
        </List>
      </Drawer>
      <Divider /> */}
       <Box sx={{bgcolor:'white',borderRadius:6}}>
            <Toolbar
            sx={{ml:0 }}
            >
            <Link to={'/'} >
            <Box sx={{display: 'flex', ml:3 , mr:-10, alignItems:'center', }}>
                <h1 style={{ '&:hover': { backgroundColor: '#e0e0e0' }}}>Back To home</h1>
                <IconButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
                    <ChevronLeftIcon sx={{ color: 'blue' }} />
                </IconButton>
            </Box>
            </Link>
            <Box sx={{display: 'flex',width:'900px', ml:50 , }}>
                {mainListItems}
                {secondaryListItems}
            </Box>
            </Toolbar>
         </Box>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 10, ml: 55, justifyContent: 'center', alignItems: 'center' }} className='mainBoxs'>
      
        <Grid container spacing={10}>
          {/* <Grid item xs={20} md={10} mt={12} lg={15} > */}
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
                width: 650,
                mt:20 
              }}
              >
              <div className='profileset' style={{ gap: '10px' }} >
                <TextField type="text" name="name" placeholder={user ? user.name : ''} value={formData.name} onChange={handleInputChange} sx={{ width: 350, height: '30px' }} />
                <TextField type="email" name="email" placeholder={user ? user.email : ''} value={formData.email} onChange={handleInputChange} sx={{ width: 350, mt: 4, height: '30px' }} />
                {/* <TextField type="tel" name="phone" placeholder={user ? user.phone : ''} value={formData.phone} onChange={handleInputChange} sx={{ width: 350, mt: 4, height: '30px' }} /> */}
                <TextField type="file" accept="image/*" onChange={handleFileChange} sx={{ width: 350, mt: 4, height: '30px' }} />
              </div>
              <Button variant='contained' onClick={updateUsers}>Save</Button>
            </Paper>
          </Grid>
        {/* </Grid> */}
      </Container>
    </div>
  );
}
