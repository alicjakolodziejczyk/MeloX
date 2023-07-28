import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import photo from '../images/girl-listening.jpg'
import {useState} from 'react'
import validator from 'validator'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


function LoginDialog(props) {
  const { onClose, open, handleOpenRegister } = props;
  const [data, setData] = useState({email: '', password: ''})
  const [error, setError] = useState({email: '', password: ''})
  const [finalError, setFinalError] = useState('')
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleChange = ({currentTarget: input}) => {
    if (input.id === 'email') {
      if (input.value.trim() === '') {
        setError({...error, email: 'Email is required'})
      }else if (!validator.isEmail(input.value)) {
        setError({...error, email: 'Invalid email'})
      }else {
        setData({...data, email: input.value})
        setError({...error, email: ''})
      }
    } else if (input.id === 'password') {
      if (input.value.trim() === '') {
        setError({...error, password: 'Password is required'})
      }else if (input.value.trim().length < 8) {
        setError({...error, password: 'Password must be at least 8 characters'})
      } else if(!validator.matches(input.value, /\d/)) {
        setError({...error, password: 'Password must contain a number'})
      } else if(!validator.matches(input.value, /[a-z]/)) {
        setError({...error, password: 'Password must contain an lowercase letter'})
      } else if(!validator.matches(input.value, /[A-Z]/)) {
        setError({...error, password: 'Password must contain an uppercase letter'})
      } else if(!validator.matches(input.value, /[!@#$%^&*(),.?":{}|<>]/)) {
        setError({...error, password: 'Password must contain a special character'})
      } else {
        setData({...data, password: input.value})
        setError({...error, password: ''})
      }
    } else if (input.id === 'passwordConfirm') {
      if (input.value.trim() === '') {
        setError({...error, passwordConfirm: 'Password confirmation is required'})
      }else if (input.value.trim() !== data.password) {
        setError({...error, passwordConfirm: 'Passwords do not match'})
      } else {
        setData({...data, passwordConfirm: input.value})
        setError({...error, passwordConfirm: ''})
      }
    }
    
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/login";
      const headers = {
        'Content-Type': 'application/json'
      };
      const { data: { token } } = await axios.post(url, data, {headers}); // Destructure the token from the response data
      localStorage.setItem("token", token);
      onClose();
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFinalError(error.response.data.error);
        console.log(error.response.data.error);
      }
    }
  };

  const handleRedirect = () => {
    onClose();
    handleOpenRegister();
  }
  

  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <IconButton onClick={onClose} sx={{position: 'absolute'}} className='top-2 right-2'><CloseRoundedIcon/></IconButton>
      <div className='grid grid-flow-col auto-cols-auto'>
        <div className='flex flex-col justify-center p-4 mx-12 my-4 min-w-[25vw]'>
          <Typography  variant='h4' className='text-center p-2' style={{fontFamily: 'GlitchGoblin', textShadow: '#e91e63 1px 1px, #3993dd -1px -1px'}}>Login</Typography>
          <form>
            <Stack spacing={2}>
              <TextField id="email" label="Email" onChange={handleChange} variant="standard" error={error.email !== ''} helperText={error.email} />
              <FormControl error={error.password !== ''} variant="standard">
                <InputLabel htmlFor="password">Name</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
            }
                  aria-describedby="password-text"
                />
                <FormHelperText id="password-text">{error.password}</FormHelperText>
              </FormControl>
              {finalError !== '' && <Typography variant="contained" color="error">{finalError}</Typography>}
              <Button variant="contained" color="primary" onClick={handleLogin}>Log In</Button>
            </Stack>
            
            
            
    </form>
    <br/>
    <Typography>
      Don't have an account? <Button onClick={handleRedirect}>Sign Up</Button>
    </Typography>
        </div>
        <div className='portrait:hidden'>
          <img className='max-h-[90vh]' src={photo} alt='girl listenning to music'/>
        </div>
      </div>
    </Dialog>
  );
}

export default LoginDialog