import React, { useState } from "react";
import Button from '@mui/material/Button';
import Sidebar from "../Sidebar/sidebar";
import EditRecipe from "./EditFile";
import MotionHoc from "./MotionHoc";
import UploadFile from "./uploadFile";
import Allrecipe from "./Allrecipe";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Documents = () => {
  const [viewMode, setViewMode] = useState("all");

  const toggleView = (mode) => {
    setViewMode(mode);
  };

  const [isUploaded, setIsUploaded] = useState(false);

  const handleInsert = () => {
    // Your insertion logic goes here
    // After successful insertion, set isUploaded to true
    setIsUploaded(true);
  };
  
  const navigate = useNavigate();
  const OpenEditMood = () =>{
    navigate('/editrecipe')
  }

  return (
    <div style={{  backgroundColor: '#FFDEE9', backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)', paddingTop:'30px'}}>
      <Sidebar />
      <Link to={'/adminProfile'}><Button variant="outlined" color="success">Goto home</Button></Link>
      <Box sx={{marginLeft:'20px'}}>
        <h1 style={{ padding:'10px', fontFamily:'Anta, sans-serif', fontWeight:'700',
      fontSize: 'calc(1rem + 1.5vw)',
      fontWeight: '700',
      background: 'linear-gradient(to right, #803bec 30%, #1b1b1b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      paddingTop:'30px',
      
      marginBottom:'10px'}}>Manage Recipe</h1>
        <Button variant="contained" onClick={() => toggleView("all")}>View All Recipe</Button>&nbsp;&nbsp;
        <Button variant="contained" onClick={() => toggleView("upload")}>Upload Recipe</Button>&nbsp;&nbsp;
      </Box>
      
      {viewMode === "all" && <Allrecipe />}
      {viewMode === "upload" && (
        <UploadFile onInsert={handleInsert} />
      )}
      
      {isUploaded && <p>Your file has been uploaded!</p>}
    </div>
  );
};

export default Documents;
