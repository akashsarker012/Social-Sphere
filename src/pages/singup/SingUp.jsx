import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Card } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';


const defaultTheme = createTheme();


export default function SignUp() {

  const navigate = useNavigate()
  const auth = getAuth();
  const [email ,setEmail] = React.useState()
  const [fullName ,setFullName] = React.useState()
  const [password ,setPassword] = React.useState()

  const [emailError ,setEmailError] = React.useState()
  const [passwordError ,setPasswordError] = React.useState()
  const [fullNameError ,setFullNameError] = React.useState()

  const handleEmail =(e)=>{
    setEmail(e.target.value);
    setEmailError('')
  }
  const handleFullName =(e)=>{
    setFullName(e.target.value);
    setFullNameError('')
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value);
    setPasswordError('')
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setEmailError('Please Enter You Email')
    }else{
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setEmailError("Please Enter a valid email address");
      }
    }
    
    if (!fullName) {
      setFullNameError('Please Enter You Email')
    }if (!password) {
      setPasswordError('Please Enter You Email')
    }

    if(fullName && email && password && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/){

      createUserWithEmailAndPassword(auth, email, password, fullName)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    sendEmailVerification(auth.currentUser)
  })
  .then(() => {
    setEmail('')
    setFullName('')
    setPassword('')
    
    toast.success('Registration Complete Verify You Email', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      setTimeout(()=>{
        navigate ('/login')
      },3000)
  }).catch((error) => {
    if(error.code.includes('auth/email-already-in-use')){
      setEmailError('This Email is already in use')
    };
    console.log(error.code);
  });
    }


    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });


  };
  const [showPassword , setShowPassword] = React.useState(false)

  return (
    <ThemeProvider theme={defaultTheme}>
            <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      <Card sx={{ maxWidth: 450,p:5, mx:'auto', marginTop:'30px'}} >
        <CssBaseline />
        <Box  sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
          Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            <TextField onChange={handleEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {emailError &&  <Typography sx={{ color: 'error.main' }} variant='p'>{emailError}</Typography>}
              <TextField onChange={handleFullName}
                margin="normal" required fullWidth name="fullName"
                value={fullName} label="Full Name" type="text"
                id="fullName"
              />
              {fullNameError &&  <Typography sx={{ color: 'error.main' }} variant='p'>{fullNameError}</Typography>}
            <TextField onChange={handlePassword}
            fullWidth
            margin="normal"
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <Button position="end">
               {
                showPassword ? 
                <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} edge="end">
                </VisibilityOffIcon>:
                <RemoveRedEyeIcon onClick={() => setShowPassword(!showPassword)}></RemoveRedEyeIcon>
               }
              </Button>
            ),
          }} />
          {passwordError &&  <Typography sx={{ color: 'error.main' }} variant='p'>{passwordError}</Typography>}
           
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
                Sign Up
            </Button>
            <Grid container>
              
              <Typography sx={{display:'flex', justifyContent:'center'}}>
              Do you have an account?  
                <Link to='/login' variant="body2">
                 Sign In
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
}