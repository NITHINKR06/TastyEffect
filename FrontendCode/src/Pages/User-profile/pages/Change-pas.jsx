import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import './ProfilePC.css'
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';


export default function Changepas() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [admin, setAdmin] = useState(null);
useEffect(() => {
// Assuming this code runs in a component and localStorage is available
const adminData = JSON.parse(localStorage.getItem('admin'));
// setAdmin(adminData);
console.log(adminData._id)

}, []);

const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    setError('Passwords do not match');
    toast.error('Password doesn\'t match');
    return;
  }

  try {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    const userId = adminData._id;

    const response = await axios.put(`http://localhost:7000/api/user/password/${userId}`, {
      currentPassword,
      newPassword,
    });
    // navigate('/');

    if (response.data.success) {
      // Handle success
      console.log(response.data.message);
      toast.success("Password changed successfully");

      // Clear text fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      // Handle failure
      console.log(response.data.message);
      setError(response.data.message); // Assuming your API returns error message in case of failure
    }
  } catch (error) {
    console.error('Error changing password:', error);
    setError('Error changing password');
  }
};


  
  return (
    <div className='changepassword' style={{
      backgroundColor: '#FFDEE9',
      // backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
      height:'100vh',
      justifyContent:'center',
      alignItems:'center',
      padding:'20px'

    }}>
      <ToastContainer position="top-center"
       autoClose={2000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      />
      
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
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4, ml:55 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    width:600
                  }}
                >
                  <div style={{display:'grid',flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'15px'}}>
                    <h1 style={{fontFamily:'Anta, sans-serif', fontSize:'30px'}}>Change The Password</h1> 
                    {/* <p>Error{error}</p>  */}
                    <TextField
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      sx={{width:'320px', mt:6}}
                    />
                    <TextField
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      sx={{width:'320px'}}
                    />
                    <TextField
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      sx={{width:'320px'}}
                    />
                    <Button variant="contained" onClick={handleChangePassword}>
                      Change Password
                    </Button>
                  </div>
                </Paper>
              </Grid>
              
            </Grid>
          </Container>
    </div>
  )
}
