import React, { useState, useEffect } from "react";

import './style.css';
import styled from "styled-components";
import Sidebar from "./Sidebar/sidebar";
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Import your background image
import backgroundImage1 from './pexels-pixabay-247676.jpg'; // Adjust the path to your image
import backgroundImage2 from './pexels-marek-piwnicki-11513011.jpg'; // Adjust the path to your image
import axios from "axios";

export default function AdminMainPage() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmin] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:7000/api/admin/getAdminInfo")
      .then((response) => {
        console.log(response.data.admins,'hii');
        setAdmin(response.data.admins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/recipe/getAllRecipes');
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/user/getAllUsers');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchSubscriptions = async () => {
      try {
          const response = await fetch('http://localhost:7000/api/userresponse/response');
          const data = await response.json();
          setSubscriptions(data);
      } catch (error) {
          console.error("Error fetching subscriptions:", error);
      }
  };
  const fetchSubscription = async () => {
    try {
        const response = await fetch('http://localhost:7000/api/feedback/all');
        const data = await response.json();
        setSubscription(data);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
    }
  };


    fetchSubscriptions();
    fetchSubscription();
    fetchRecipes();
    fetchUsers();
  }, []);

  const Pages = styled.div`
    width: 100vw;
    height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: calc(0.8rem + 1vw);
      font-weight: 700;
      background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `;

  return (
    <div className='html' >
      <Sidebar />
      <div className='body'>
      <h1 style={{ 
          fontSize: 'calc(1rem + 1vw)',
          fontWeight: '700',
          background: 'linear-gradient(to right, #803bec 30%, #1b1b1b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          paddingTop:'50px',
          marginBottom:'-80px'
      }}>
          Welcome {admins.length > 0 ? admins[0].name : ''} <br/>
          To Your Administration dashboard
      </h1>

        <Pages>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '100px', width:'85%', bgcolor:'', flexWrap:'wrap', padding:'30px', marginTop:'30px'}}>
            <Box className="4" sx={{
              width: '400px',
              height: '80px',
              backgroundColor: 'white',
              borderRadius: '25px',
              paddingTop: '85px',
              backgroundImage: `url(${backgroundImage2})`, // Set background image
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <h1>Number of Users: {users.length}<br/></h1>
              <Link to={'/team'}>
                <Button variant='contained' color='success' >View</Button>
              </Link>
            </Box>
            <Box className="4" sx={{
              width: '400px',
              height: '80px',
              backgroundColor: 'white',
              borderRadius: '25px',
              paddingTop: '85px',
              backgroundImage: `url(${backgroundImage2})`, // Set background image
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <h1>Number of Recipe Items: {recipes.length}<br/></h1>
              <Link to={'/documents'}>
                <Button variant='contained' color='success' >View</Button>
              </Link>
            </Box>
            <Box className="4" sx={{
              width: '400px',
              height: '80px',
              backgroundColor: 'white',
              borderRadius: '25px',
              paddingTop: '85px',
              backgroundImage: `url(${backgroundImage2})`, // Set background image
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <h1>Subcritions {subscriptions.length}<br/></h1>
              <Link to={'/notification'}>
                <Button variant='contained' color='success' >View</Button>
              </Link>
            </Box>
            <Box className="4" sx={{
              width: '400px',
              height: '80px',
              backgroundColor: 'white',
              borderRadius: '25px',
              paddingTop: '85px',
              backgroundImage: `url(${backgroundImage2})`, // Set background image
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
            }}>
              <h1>Feedbacks {subscription.length}<br/></h1>
              <Link to={'/feedbacks'}>
                <Button variant='contained' color='success' >View</Button>
              </Link>
            </Box>
          </Box>
        </Pages>
      </div>
    </div>
  );
}
