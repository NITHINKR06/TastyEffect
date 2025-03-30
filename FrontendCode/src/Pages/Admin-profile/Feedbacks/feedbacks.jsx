import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import backgroundImage2 from '../pexels-marek-piwnicki-11513011.jpg'; // Adjust the path to your image

export default function FedbackFromUser() {

    const [subscriptions, setSubscriptions] = useState([]);

    const Pages = styled.div`
        width: 100vw;
        
        display: flex;
        justify-content: center;
        align-items: center;

        // h1 {
        //     font-size: calc(0.8rem + 1vw);
        //     font-weight: 700;
        //     // background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
        //     background: 'white';
        //     // -webkit-background-clip: text;
        //     // -webkit-text-fill-color: transparent;
        // }
    `;

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch('http://localhost:7000/api/feedback/all');
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };

        fetchSubscriptions();
    }, []);

    const handleDelete = async (id) => {
        console.log(id)
        try {
            await fetch(`http://localhost:7000/api/feedback/delete/${subscriptions?.id}`, {
                method: 'DELETE'
            });
            setSubscriptions(subscriptions.filter(subscription => subscription.id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    return (
        <div style={{paddingBottom:'50px'}}>
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
                }}>Feedbacks</h1>
                {/* Total : {subscriptions.length} */}
            </Box>
            <Pages>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', width: '70%', bgcolor: '', flexWrap: 'wrap', padding: '' }}>
                    {subscriptions.map((subscription, index) => (
                        <Box key={index} className="4" sx={{
                            width: '500px',
                            height: 'auto',
//                             background-color: #FFDEE9;
// background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);

                            // backgroundColor: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',
                            borderRadius: '25px',
                            paddingTop: '20px',
                            border:'2px black',
                            gap:'5px',  
                            textAlign:'left',
                            paddingLeft:'25px',
                            paddingRight:'25px',
                            marginBottom:'20px',
                            paddingBottom:'20px',
                            backgroundColor: 'lightblue',
                            // backgroundImage: `url(${backgroundImage2})`,
                            // backgroundSize: 'cover',
                            // backgroundPosition: 'center',
                        }}>
                            <h1 style={{ 
                                fontSize: 'calc(0.7rem + 0.5vw)',
                                fontWeight: '800',
                                textAlign:'right',
                                color:'red'
                                // paddingTop:'10px'
                            }}> &nbsp;&nbsp;{index+1}</h1>
                            <Box sx={{display:'flex'}}>
                                <h1
                                style={{ 
                                    fontSize: 'calc(0.7rem + 0.5vw)',
                                    fontWeight: '700',
                                    // paddingTop:'10px'
                                }}>UserName: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                <h1 style={{ 
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    fontWeight: '650',
                                    paddingTop:'2px',
                                    color:'green'
                                }}>{subscription.name}</h1>
                            </Box>
                            <Box sx={{display:'flex'}}>

                             <h1
                            style={{ 
                                fontSize: 'calc(0.7rem + 0.5vw)',
                                fontWeight: '700',
                                paddingTop:'10px'
                            }}>UserEmail: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                               <h1 style={{ 
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    fontWeight: '650',
                                    paddingTop:'10px',
                                    color:'green'
                                }}>{subscription.email}</h1>
                            </Box>

                            <Box sx={{display:'flex'}}>
                                <h1
                                style={{ 
                                    fontSize: 'calc(0.7rem + 0.5vw)',
                                    fontWeight: '700',
                                    paddingTop:'10px',
                                }}>UserMessage:&nbsp;&nbsp;</h1>
                                <h1 style={{ 
                                    fontSize: 'calc(0.5rem + 0.5vw)',
                                    fontWeight: '650',
                                    paddingTop:'10px',
                                    color:'green'
                                }}>{subscription.message}</h1>
                            </Box>
                            {/* <Button onClick={() => handleDelete(subscription.id)} variant="contained" color="error">Delete</Button> */}
                        </Box>
                    ))}
                </Box>
            </Pages>
        </div>
    )
}
