import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import backgroundImage2 from '../pexels-marek-piwnicki-11513011.jpg'; // Adjust the path to your image

export default function Subnotify() {

    const [subscriptions, setSubscriptions] = useState([]);

    const Pages = styled.div`
        width: 100vw;
        
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

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch('http://localhost:7000/api/userresponse/response');
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };

        fetchSubscriptions();
    }, []);

    return (
        <div>
            <Box>
                <h1
                style={{ 
                    fontSize: 'calc(1rem + 1.5vw)',
                    fontWeight: '700',
                    background: 'linear-gradient(to right, #803bec 30%, #1b1b1b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    paddingTop:'50px',
                    marginBottom:'35px'
                }}>Total Subscriptions: {subscriptions.length}</h1>
            </Box>
            <Pages>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '70%', bgcolor: '', flexWrap: 'wrap', padding: '' }}>
                    {subscriptions.map((subscription, index) => (
                        <Box key={index} className="4" sx={{
                            width: '300px',
                            height: '200px',
                            backgroundColor: 'lightblue',
                            borderRadius: '25px',
                            paddingTop: '85px',
                            // backgroundImage: `url(${backgroundImage2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                            <h1
                            style={{ 
                                fontSize: 'calc(0.7rem + 0.5vw)',
                                fontWeight: '800',
                                background: 'linear-gradient(to right, #803bbec 30%, #1b2b1b 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                // paddingTop:'50px',
                                // marginBottom:'-90px'
                            }}>{subscription.email}</h1>
                            {/* <br />Created At: {new Date(subscription.createdAt).toLocaleString()}</h1> */}
                            <Link to={`https://mail.google.com/mail/u/0/#inbox?compose=new${subscription.email}`} target='_blank'>
                                <Button variant='contained' color='success'>Send Mail</Button>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Pages>
        </div>
    )
}
