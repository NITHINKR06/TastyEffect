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

const defaultTheme = createTheme();

export default function AdminSignUp() {
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
      .post("http://localhost:7000/api/admin/register", formData)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.success) {
          await navigate("/adminlogin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
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
          <Box
            sx={{
              my: 8,
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
              Sign up
            </Typography>
            <Box sx={{ mt: 1 }}>
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
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                onChange={handleFileChange}
                margin="normal"
                required
                fullWidth
                label="Profile"
                name="profile"
                type="file"
                autoComplete="email"
                autoFocus
              />

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                // sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/adminlogin"} variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
