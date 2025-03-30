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
import { ToastContainer, toast } from "react-toastify";
import HomeIcon from "@mui/icons-material/Home";

import './loginstyle.css'

const defaultTheme = createTheme();

export default function UserLoginPage() {
  const [userInfo, setUserInfo] = useState(null);
  let navigate = useNavigate();
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  console.log(userInfo);
  const handleSubmit = (event) => {

    if (!userInfo || !userInfo.email || !userInfo.password) {
      toast.error("Please fill in all fields."); // Display error message
      return; // Stop further execution
    }

    axios
      .post("http://localhost:7000/api/user/login", userInfo)
      .then(async (response) => {
                
        if (response.data.success) {
          console.log(response.data);
          await localStorage.setItem(
            "admin",
            JSON.stringify(response.data.loggedInUser)
          );
          await localStorage.setItem(
            "token",
            JSON.stringify(response.data.authToken)
          );
          toast.success("Admin Login into Ur Profile", {
            // position: toast.POSITION.TOP_RIGHT,
          });
          await navigate("/user-profile");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.success("Admin Login into Ur Profile")
      });
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
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

      <Grid container component="main" sx={{ height: "80vh", width:'90%', ml:30, mt:5 , }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?animals)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Link to={'/adminlogin'}> <Button sx={{mt:5, mb:-10 ,ml:50}} variant="outlined" color="success">Admin Login</Button></Link>

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
              User Login Page
            </Typography>
            <Box sx={{ mt: 1 }}>
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

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid> */}
                <Grid item>
                  <Link to={"/usersignup"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // <>
    //   <div className="w-full min-h-screen flex items-center justify-center loginpage">
    //     <div className="w-[32%] h-auto py-10 px-12 rounded-xl logincard">
    //       <div className="w-full h-auto">
    //         <h1 className="text-[1.475rem] text-white font-semibold mb-1"> Sign in</h1>
    //         <p className="text-sm text-gray-30 font-normal mb-8">Welcome</p>
    //       </div>
    //       <div className="w-full h-auto flex items-center gap-7">
    //         <div className="w-1/2 h-auto">
    //           <button className="w-full h-12 p-4 outline-none bg-transparent border-[2px] border-gray-200/40 text-white rounded-md flex items-center gap-x-2 hover:bg-gray-100/40 ease-out duration-700">
    //             Google
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
