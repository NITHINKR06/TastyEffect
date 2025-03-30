import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Rating,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";


const EditRecipe = ({ selectedRecipe, setSelectedRecipe }) => {

  const [recipePhoto, setRecipePhoto] = useState('');
  const [steps, setSteps] = useState([{recipeSteps:''}]);
  const [inputs, setInputs] = useState([{ recipeIngredient: '' }]);
  console.log(selectedRecipe)

  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedRecipe({
      ...selectedRecipe,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleFileChange = (event) => {
    setRecipePhoto(event.target.files[0]);
  };

  const handleUpdate = (event) => {
  const data = new FormData();
  data.append("recipeName", selectedRecipe.recipeName);
  data.append("recipeId", selectedRecipe.recipeId);
  data.append("recipeTime", selectedRecipe.recipeTime);
  data.append("recipeRating", value);
  data.append("recipeDiscription", selectedRecipe.recipeDiscription);
  data.append("recipeVedioLink", selectedRecipe.recipeVedioLink);
  data.append("profile", recipePhoto);

  // Append recipeIngredient data
  inputs.forEach((ingredient, index) => {
    data.append(`recipeIngredient[${index}]`, ingredient.recipeIngredient);
  });

  // Append recipeSteps data
  steps.forEach((step, index) => {
    data.append(`recipeSteps[${index}]`, step.recipeSteps);
  });

  console.log(data, 'Going to update info');

  axios.put(`http://localhost:7000/api/recipe/updateRecipe/${selectedRecipe._id}`, data)
    .then(async (response) => {
      console.log(response, 'updated data');
      console.log(response.data)
      toast.success('Recipe Updated Successfully');
      setTimeout(() => {
        navigate("/documents");
      }, 1015);
    })
    .catch((error) => {
      console.log(error);
    });
};


  const handleAddInput = () => {
    console.log("Adding input...");
    setInputs([...inputs, { recipeIngredient: '' }]); // Update here
    selectedRecipe.recipeIngredient.push('')
  };
  
  const handleAddSteps = () => {
    console.log("Adding steps...");
    setSteps([...steps, { recipeSteps: '' }]); // Update here
  };
  

  console.log(selectedRecipe)
  const handleDeleteInput = (index) => {
    console.log("deleteing Inpute...");
    
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  

  const handleDeleteSteps = (index) => {
    console.log("deleteing steps...");
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };
  
  const handleInputChange = (index, name, e) => {
    const newInputs = [...inputs];
    newInputs[index] = { ...newInputs[index], [name]: e.target.value };
    setInputs(newInputs);
  };
  
  const handleStepChange = (index, name, e) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [name]: e.target.value };
    setSteps(newSteps);
  };
  
  
  const [value, setValue] = React.useState('');
  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    if (selectedRecipe) {
      setInputs(selectedRecipe.recipeIngredient.map(ingredient => ({ recipeIngredient: ingredient })) || []);
      setSteps(selectedRecipe.recipeSteps.map(step => ({ recipeSteps: step })) || []);
    }
  }, [selectedRecipe]);
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="top-center"
       autoClose={509}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      />
      <Container component="main" maxWidth="">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "grid",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            paddingLeft: 20,
            marginLeft: 20,
          }}
        >
          <Box sx={{ mt: 3, justifyContent: "center", alignItems: "center", mb:-10 }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ display: "grid", justifyContent: "center", marginLeft: "-90px" }}>
                <img src={`http://localhost:7000/uploads/recipe/${selectedRecipe?.profile}`} alt="Recipe Photo" style={{height:'250px'}}/>
                <h1 style={{ fontFamily: "Anta, sans-serif", fontSize: "22px" }}>Rating for the Recipe you added</h1>
                &nbsp;&nbsp;
                <Rating
                      id="recipeRating"
                      name="recipeRating"
                      value={selectedRecipe?.recipeRating}
                      onChange={handleRatingChange}
                      sx={{ paddingLeft: "70px", mb: 3 , fontSize:'35px'}}
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
                  value={selectedRecipe?.recipeId}
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
                  value={selectedRecipe?.recipeTime}

                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  id="recipeName"
                  label="recipeName"
                  name="recipeName"
                  autoComplete="Name"
                  value={selectedRecipe?.recipeName}

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
                  value={selectedRecipe?.recipeDiscription}

                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="recipeVedioLink"
                  label="Recipe Vedio Link"
                  name="recipeVedioLink"
                  autoComplete="Vedio Link"
                  value={selectedRecipe?.recipeVedioLink}

                />
              </Grid>
              <Grid item xs={12} sm={9} >
                {inputs.map((input, index) => (
                  <Grid key={index} sx={{display:'flex', marginBottom:'5px'}}>
                    <TextField
                      fullWidth
                      required
                      id={`recipeIngredient-${index}`}
                      name={`recipeIngredient`}
                      label={`Ingredient ${index + 1}`}
                      type="text"
                      value={input.recipeIngredient} // Update here
                      onChange={(e) => handleInputChange(index, 'recipeIngredient', e)} // Update here
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="outlined" onClick={() => handleDeleteInput(index)}>Delete</Button>
                  </Grid>
                ))}

              </Grid>

              <Grid item xs={12} sm={9}>
                {/* <Button variant="outlined" sx={{ height: 55, width: "395px" }} onClick={handleAddInput}>
                  Add Ingredient
                </Button> */}
                <Button variant="outlined" sx={{ height:55, width:'395px'}} onClick={handleAddInput}>Add Ingredient</Button>
              </Grid>
              <Grid item xs={12} sm={9}>
                {steps.map((step, index) => (
                  <Grid key={index} sx={{display:'flex', marginBottom:'5px'}}>
                    <TextField
                      fullWidth
                      required
                      id={`recipeSteps-${index}`}
                      name={`recipeSteps`}
                      label={`Recipe Steps ${index + 1}`}
                      type="text"
                      value={step.recipeSteps} // Update here
                      onChange={(e) => handleStepChange(index, 'recipeSteps', e)}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="outlined" onClick={() => handleDeleteSteps(index)}>Delete</Button>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} sm={9}>
                {/* <Button variant="outlined" sx={{ height: 55, width: "395px" }} onClick={handleAddSteps}>
                  Add Reacipe Steps
                </Button> */}
                <Button variant="outlined" sx={{ height:55, width:'395px'}} onClick={handleAddSteps}>Add Reacipe Steps</Button>
              </Grid>

              <Grid item xs={12} sm={9}>
                <TextField onChange={handleFileChange} required fullWidth name="profile" id="profile" type="file"
/>
              </Grid>
            </Grid>

            <Button
              onClick={handleUpdate}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 10 , ml:-20}}
            >
              Update
            </Button>
          </Box>
            <Link to={'/documents'}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 10 , ml:-20}}
            >
              Cancel
            </Button>
            </Link>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default EditRecipe;
