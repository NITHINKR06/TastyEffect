import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import "./AboutUsStyles.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import img from '../assets/pngwing.com (8).png';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from "react-toastify";
function AboutUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7000/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response)
      if (response.ok) {
        toast.success("Infromation sent successfully")
        console.log('Form submitted successfully!');
        // Clear form fields after successful submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        navigate('/aboutus')
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };
  

  return (
    <>
      <div className="mainDiv">
          <h1 className="text1">Tasty Effect</h1>
        <Box className="contact-section" sx={{justifyContent:'center', alignItems:'center',  marginTop: '30px', ml:20, width:'80%'}}>
        <Box sx={{  display:'flex', ml:10, mt:5}}>
          <div style={{width:'53%'}}>
            <h1 className="text2"> 
              Welcome to our recipe haven, where culinary creativity meets simplicity! At our recipe website, we strive to inspire both novice and seasoned chefs alike. Dive into a treasure trove of diverse and delectable recipes, carefully curated to cater to various tastes and dietary preferences. Whether you're a gastronomic adventurer or seeking quick and easy solutions for everyday meals, our collection has something for everyone. Our mission is to make cooking an enjoyable and accessible experience for all, fostering a community of food enthusiasts who share a passion for delicious homemade dishes. Join us on a culinary journey that celebrates flavors, traditions, and the joy of sharing a wholesome meal with loved ones.</h1>
          </div>
          <div>
            <img src={img} alt="" style={{height:'450px', width:'450px'}} />
          </div>
        </Box>

          <div style={{width:'50%', marginLeft:'280px'}}>
            <h2>Contact Us</h2>
            <p>If you have any questions, feedback, or inquiries, feel free to get in touch with us using the form below:</p>
            <div className="contact-container" >
              <form onSubmit={handleSubmit} style={{margin:50}}>
                <label style={{textAlign:'left'}}><br/>
                  Name:<br/>
                  {/* <input type="text" name="name" value={formData.name} onChange={handleChange} /> */}
                  <TextField fullWidth id="filled-basic" variant="outlined"  type="text" name="name" value={formData.name} onChange={handleChange}/>
                </label>

                <label style={{textAlign:'left'}}><br/>
                  Email:<br/>
                  {/* <input type="email" name="email" value={formData.email} onChange={handleChange} /> */}
                  <TextField fullWidth id="filled-basic" variant="outlined" type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>

                <label style={{textAlign:'left'}}><br/>
                  Message:<br/>
                  {/* <textarea name="message" value={formData.message} onChange={handleChange} /> */}
                  <TextField fullWidth
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={4}
                    name="message" value={formData.message} onChange={handleChange} 
                  />
                </label><br/>

                {/* <button type="submit">Submit</button> */}
                <Button type="submit" variant="contained" sx={{width:'200px'}} endIcon={<SendIcon />}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Box>

      </div>
      
    </>
  );
}

export default AboutUs;
