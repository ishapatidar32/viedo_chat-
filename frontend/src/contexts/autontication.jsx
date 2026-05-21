import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../App.css";
// TODO remove, this demo shouldn't need to reset the theme.
import { useState } from "react";
import { useAuth } from "../contexts/authcontent.jsx";
const defaultTheme = createTheme();

export default function AuthenticationContext() {
    const [username  , setusername] = React.useState();
    const [password , setpassword] = React.useState();
    const [name , setname] = React.useState();
    const [mesg , setmsg] = React.useState();
    const [error , seterror] = React.useState();
    const [formstate , setformstate] = React.useState(0);
     let {handleLogin , handleRegister} = useAuth();
     const  handleauth = async () =>{
      try{
         if(formstate ===0){
         let result = await handleLogin(username , password);
         console.log(result);
         }
         if(formstate === 1){
           let result = await handleRegister(name , username , password);
           console.log(result);     
           setMessag(result.message);
           
         }
      }catch(error){
        throw error;
      }
     } 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
             <div className="singbutton">
              <button variant = {formstate === 0 ? "contained" : ""} onClick={() => setformstate(0)}>
                Sign in
              </button>
              <button variant = {formstate === 1 ? "contained" : ""} onClick={() => setformstate(1)}>
                Sign up
              </button>
             </div>
             <Box  component="form" sx={{ mt: 1 }}>
                {formstate === 1 ? 
                   <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoFocus
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
                :
                  <></> }
                <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setusername(e.target.value)} 
               />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value ={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}