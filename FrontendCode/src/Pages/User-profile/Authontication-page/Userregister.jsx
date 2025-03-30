import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import HomeIcon from "@mui/icons-material/Home";
import { ToastContainer, toast } from "react-toastify";


const defaultTheme = createTheme();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UserSignUp() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };
  const handleFileChange = (event) => {
    setUserProfile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    console.log(userInfo)
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("profile", userProfile);
    // console.log(userInfo);
    // console.log(userProfile);
    // console.log(formData);
    axios
      .post("http://localhost:7000/api/user/insertUser", formData)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.success) {
          toast.success('Account Created')
          await navigate("/userlogin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)', pb:8}}>
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
      <Link to={'/'}><HomeIcon fontSize="large"  sx={{mt:5}}/></Link>
      <Grid container component="main" sx={{height: "80vh", width:'90%', ml:30, mt:5 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?foods)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Link to={'/adminlogin'}> <Button sx={{mt:5, mb:-10 ,ml:50}} variant="outlined" color="success">Admin Login</Button></Link>

          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              User Registeration page
            </Typography>
            
              <Box sx={{ mt: 1 }}>
              <Grid item xs={12} >
                <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                {/* <TextField
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  /> */}
                   <FormControl sx={{  width: '45ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        onChange={handleChange}
                        fullWidth
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                <Grid item xs={12} >
                  <Button
                    component="label"
                    onChange={handleFileChange}
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    label="Profile"
                    id="profile"
                    name="profile"
                    sx={{mt:2, mb:2, width:450,height:'50px '}}
                  >
                    Upload Profile Picture
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Grid>

                <Button
                  onClick={handleSubmit}
                  fullWidth
                  variant="outlined"
                  color="primary"

                >
                  Sign Up
                </Button>
                <Grid sx={{mt:2}}>
                  <Grid item>
                    <Link to={"/userlogin"} variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              
              </Box>
           
          </Box>
        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
}
