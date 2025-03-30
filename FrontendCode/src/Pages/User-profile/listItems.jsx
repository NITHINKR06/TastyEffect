import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HttpsIcon from '@mui/icons-material/Https';
import LanguageIcon from '@mui/icons-material/Language';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

// Add a global CSS rule to remove underline from links
const listItemLinkStyle = {
  textDecoration: 'none',
};

const handleTokenLogout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  // Navigate to user login page
  window.location.href = '/'; // You can replace 'user-login' with your actual login page route
};


export const mainListItems = (
  <React.Fragment>
    <Box sx={{display:'flex'}}>
    <Link to={'/user-profile'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <AccountBoxIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Profile" sx={{color:'black'}}/>
      </ListItemButton>
    </Link>

    <Link to={'/profile-setting'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <ManageAccountsIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Profile Setting" sx={{color:'black'}}/>
      </ListItemButton>
    </Link>

    <Link to={'/change-password'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <HttpsIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Change Password" sx={{color:'black'}}/>
      </ListItemButton>
    </Link>
    </Box>

    {/* <Link to={'/language'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <LanguageIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Language" sx={{color:'black'}}/>
      </ListItemButton>
    </Link> */}
  </React.Fragment>
);

export const secondaryListItems = (

 

  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}

    <Link to={'/saved-items'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <LoyaltyIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Saved items" sx={{color:'black'}}/>
      </ListItemButton>
    </Link>

    {/* <Link to={'/manage-review'} style={listItemLinkStyle}>
      <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
        <ListItemIcon>
          <VolunteerActivismIcon sx={{color:'blue'}}/>
        </ListItemIcon>
        <ListItemText primary="Manage Reviews" sx={{color:'black'}}/>
      </ListItemButton>
    </Link> */}

    <ListItemButton onClick={handleTokenLogout} sx={{ '&:hover': { backgroundColor: '#e0e0e0' } , paddingLeft:'30px', width:'150px'}}>
      <ListItemIcon>
        <LogoutIcon sx={{color:'blue'}}/>
      </ListItemIcon>
      <ListItemText primary="Logout" sx={{color:'black'}}/>
    </ListItemButton>
  </React.Fragment>
  
);
