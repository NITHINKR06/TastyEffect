import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems } from '../listItems';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { Box, Drawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from "axios";
import MyRecipePage from '../../Recipes/Pages/Search';
import './Profile.css'

export default function Profile() {
    const [user, setUser] = useState(null);
    // console.log('hii')

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token)

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.id;
            console.log(decodedToken)

            axios.get(`http://localhost:7000/api/user/viewSingleUser/${userId}`)
            .then((response) => {
                setUser(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        
        }
    }, []);

    return (
        <div className='profilePage' style={{
            backgroundColor: '#FFDEE9',
            // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
            height:'100vh',
            padding:'20px'
            // marginTop:'-40px'
          }}>
            {/* <Drawer variant="permanent">
                <Divider />
                <Divider />
                <List component="nav" >
                    <Divider sx={{ my: 3 }} />
                    {/* <secondaryListItems /> */}
                {/* </List> */}
            {/* </Drawer> */} 
            {/* <Divider /> */}

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
            <Container maxWidth="lg" sx={{ mt: 5, mb: 10, ml:55 ,justifyContent:'center', alignItems:'center'}} className='mainBox'>
               
                <Grid container spacing={10}>
                    <Grid item xs={20} md={10} mt={12} lg={15} >
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 400,
                                width:650
                            }}
                        >
                            {user ? (
                                <div className='profile' style={{justifyContent:'center', alignItems:'center', display:'flex',  backgroundColor: '#FFDEE9',
                                // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
                                height:'100vh', gap:'20px'}} >
                                    <img src={`http://localhost:7000/uploads/user/${user.profile}`} alt="hii" style={{height:'200px', width:'200px'}}/>
                                    <div className='Ptext'>Welcome,
                                        <p className='text'>{user.name}</p> 
                                        <p className='text'>Email: {user.email}</p>
                                    </div>
                                    {/* Add more user information as needed */}
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
