import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function UploadFile() {
  const [inputs, setInputs] = useState([{recipeIngredient:''}]);
  const [steps, setSteps] = useState([{recipeSteps:''}]);
  const [recipeInfo, setRecipeInfo] = useState({});
  const [recipeProfile, setRecipeProfile] = useState(null);
  let navigate = useNavigate();

  
  const handleChange = (event) => {
    setRecipeInfo({ ...recipeInfo, [event.target.name]: event.target.value });
  };
  console.log(recipeInfo)
  
  const handleFileChange = (event) => {
    setRecipeProfile(event.target.files[0]);
  };

  // if (!recipeInfo || !recipeInfo.recipeId || !recipeInfo.recipeTime || !recipeInfo.recipeName || !recipeInfo.recipeDiscription || !recipeProfile || !values || inputs.some(input => !input) || steps.some(step => !step)) {
  //   toast.warning("Please fill out all the fields.");
  //   return; 
  // }
  const handleInsert = () => {
    const data = new FormData();
    data.append("recipeId", recipeInfo.recipeId);
    data.append("recipeTime", recipeInfo.recipeTime);
    data.append("recipeName", recipeInfo.recipeName);
    data.append("recipeDiscription", recipeInfo.recipeDiscription);
    data.append("profile", recipeProfile);
    data.append("recipeRating", values);
    data.append("recipeVedioLink", recipeInfo.recipeVedioLink); // Add recipeVedioLink to FormData
    console.log(recipeInfo.recipeVedioLink,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    inputs.forEach((ingredient, index) => {
      data.append(`recipeIngredient[${index}]`, ingredient.recipeIngredient);
    });
  
    steps.forEach((step, index) => {
      data.append(`recipeSteps[${index}]`, step.recipeSteps);
    });
  
    axios
      .post("http://localhost:7000/api/recipe/insertRecipe", data)
      .then(async (response) => {
        toast.success("Recipe Added to the list successfully .");
        console.log("Response from server:", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


console.log(steps)
  const handleAddInput = () => {
    const newRecipe={recipeIngredient:''}
    setInputs([...inputs,newRecipe]);
  };

  const handleInputChange = (index,name,e) => {
    const newInputs = [...inputs];
    newInputs[index][name] = e.target.value;
    setInputs(newInputs);
    console.log(newInputs)
  };
  console.log(inputs)

  const handleDeleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  
  /* For Recipe Steps */
  const handleAddSteps = () => {
    const restep={recipeSteps:''}
    setSteps([...steps,restep]);
  };

  const handleStepChange = (index,name,e) => {
    // alert(name)
    const newInput = [...steps];
    newInput[index][name] = e.target.value;
    setSteps(newInput);
  };

  
  const handleDeleteInputs = (index) => {
    const newInput = [...steps];
    newInput.splice(index, 1);
    setSteps(newInput);
  };
  
  const [values, setValue] = React.useState('');

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
     <>
      {/* <ToastContainer position="top-center"
       autoClose={2000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      /> */}
    <div style={{backdropFilter:'blur(20px)' , width:'80%', justifyContent:'center', alignItems:'center', marginLeft:'170px' }} >
 
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "grid",
            flexDirection: "column",
            alignItems: "center",
            width:'80%',
            // backgroundColor:'red',
            paddingLeft:20,
            marginLeft:15
          }}
        >
          <Box sx={{ mt: 3 ,justifyContent:'center',
            alignItems:'center'}}>
            <Grid container spacing={1}>
            <Grid item xs={12} sx={{display:'grid', justifyContent:'center',marginLeft:'-90px'}}>
                 <h1 style={{fontFamily:'Anta, sans-serif', fontSize:'22px'}}>Rating for the Recipe you added</h1>&nbsp;&nbsp;
                  <Rating
                    name="recipe-rating"
                    value={values}
                    onChange={handleRatingChange}
                    sx={{paddingLeft:'100px', mb:3}}
                  />
                
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  onChange={handleChange}
                  autoComplete="RecipeId"
                  name="recipeId"
                  required
                  fullWidth
                  id="recipeId"
                  label="Recipe Id"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="recipeTime"
                  label="Time to prepare"
                  name="recipeTime"
                  autoComplete="Time"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <TextField 
              onChange={handleChange}
                  fullWidth 
                  id="recipeName" 
                  label="recipeName"
                  name="recipeName" // Ensure the name attribute is set to "recipeName"
                  autoComplete="Name"
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="recipeDiscription"
                  label="recipeDiscription"
                  name="recipeDiscription"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={4.5} >
                <TextField 
                  
                  // sx={{ height:55, width:'395px'}}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="recipeVedioLink"
                  label="Recipe Vedio Link"
                  name="recipeVedioLink"
                  autoComplete="Vedio Link"
                />
              </Grid>
              <Grid item xs={12} sm={9} >
                  {inputs.map((inputs, index) => (
                    <Grid  key={index} sx={{display:'flex', marginBottom:'5px'}}>
                      {/* Using TextField instead of input */}
                      <TextField
                        fullWidth
                        required
                        id={`recipeIngredient-${index}`}
                        name={`recipeIngredient`}
                        label={`Ingredient ${index + 1}`}
                        type="text"
                        // sx={{marginTop:'2px'}}
                  
                        onChange={(e) => handleInputChange(index,'recipeIngredient',e)}
                      />&nbsp;&nbsp;&nbsp;
                      {/* Using Button instead of button */}
                      <Button variant="outlined"  onClick={() => handleDeleteInput(index)}>Delete</Button><br />  
                    </Grid> 
                  ))}
              </Grid>
           
              <Grid item xs={12} sm={9}>
                <Button variant="outlined"  sx={{ height:55, width:'395px'}} onClick={handleAddInput}>Add Ingredient</Button>
              </Grid> 

              <Grid item xs={12} sm={9}>
                {steps.map((input, index) => (
                    <Grid  key={index} sx={{display:'flex', marginBottom:'5px'}}>
                      {/* Using TextField instead of input */}
                      <TextField
                        fullWidth
                        required
                        id={`recipeSteps-${index}`}
                        name={`recipeSteps`}
                        label={`Recipe Steps ${index + 1}`}
                        type="text"
                        // sx={{marginTop:'2px'}}
                     
                        onChange={(e) => handleStepChange(index,'recipeSteps',e)}
                      />&nbsp;&nbsp;&nbsp;
                      {/* Using Button instead of button */}
                      <Button variant="outlined" /* sx={{marginLeft:'', height:55, width:'150px'}}  */onClick={() => handleDeleteInputs(index)}>Delete</Button>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12} sm={9}>
                  <Button variant="outlined" sx={{ height:55, width:'395px'}} onClick={handleAddSteps}>Add Reacipe Steps</Button>
              </Grid>
              
                <Grid item xs={12} sm={9}>
                  <TextField
                    onChange={handleFileChange}
                    required
                    fullWidth
                    name="profile"
                    id="recipeProfile"
                  //   label="Profile Picture"
                    type="file"
                  />
              </Grid>
            </Grid>
            
            <Button
              onClick={handleInsert}
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 10 , ml:-25}}
            >
              Insert
            </Button>
            
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
    </div>
     </>
  );
}
