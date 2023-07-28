import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import photo from '../images/group-dancing.jpg';
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


function RegisterDialog(props) {
  const { onClose, open, handleOpenLogin } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [finalError, setFinalError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    if (id === 'name') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, name: 'Name is required' }));
      } else {
        setData((prevState) => ({ ...prevState, name: value }));
        setError((prevState) => ({ ...prevState, name: '' }));
      }
    } else if (id === 'email') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, email: 'Email is required' }));
      } else if (!validator.isEmail(value)) {
        setError((prevState) => ({ ...prevState, email: 'Invalid email' }));
      } else {
        setData((prevState) => ({ ...prevState, email: value }));
        setError((prevState) => ({ ...prevState, email: '' }));
      }
    } else if (id === 'password') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, password: 'Password is required' }));
      } else if (value.trim().length < 8) {
        setError((prevState) => ({ ...prevState, password: 'Password must be at least 8 characters' }));
      } else if (!validator.matches(value, /\d/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a number' }));
      } else if (!validator.matches(value, /[a-z]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a lowercase letter' }));
      } else if (!validator.matches(value, /[A-Z]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain an uppercase letter' }));
      } else if (!validator.matches(value, /[!@#$%^&*(),.?":{}|<>]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a special character' }));
      } else {
        setData((prevState) => ({ ...prevState, password: value }));
        setError((prevState) => ({ ...prevState, password: '' }));
      }
    } else if (id === 'passwordConfirm') {
      if(value.trim() === ''){
        setError((prevState) => ({ ...prevState, passwordConfirm: 'Password confirmation is required' }));
      } else if (value.trim() !== data.password){
        setError((prevState) => ({ ...prevState, passwordConfirm: 'Passwords do not match' }));
      } else {
        setData((prevState) => ({ ...prevState, passwordConfirm: value }));
        setError((prevState) => ({ ...prevState, passwordConfirm: '' }));
      }
    }
    console.log(data)
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth/register';
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(url, userData, { headers });
      localStorage.setItem('token', response.data.token);
      onClose();
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setFinalError(error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };

  const handleRedirect = () => {
    onClose();
    handleOpenLogin();
  }


  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <IconButton onClick={onClose} sx={{position: 'absolute'}} className='top-2 right-2'><CloseRoundedIcon/></IconButton>
      <div className='grid grid-flow-col auto-cols-auto'>
        <div className='flex flex-col justify-center p-4 mx-12 my-4 min-w-[25vw]'>
          
          <Typography variant='h4' className='text-center p-2' style={{fontFamily: 'GlitchGoblin', textShadow: '#e91e63 1px 1px, #3993dd -1px -1px'}}>Sign Up</Typography>
          <form>
            <Stack spacing={2}>
              <TextField id="name" label="Name" onChange={handleChange} variant="standard" error={error.name !== ''} helperText={error.name} />
              <TextField id="email" label="Email" onChange={handleChange} variant="standard" error={error.email !== ''} helperText={error.email} />
              <FormControl error={error.password !== ''} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
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

              <FormControl error={error.password !== ''} variant="standard">
                <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
                <Input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPasswordConfirm ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
            }
                  aria-describedby="passwordConfirm-text"
                />
                <FormHelperText id="passwordConfirm-text" color="error">{error.passwordConfirm}</FormHelperText>
              </FormControl>

              {finalError !== '' && <Typography variant="contained" color="error">{finalError}</Typography>}
              <Button variant="contained" color="primary" onClick={handleRegister}>Sign In</Button>
            </Stack>    
    </form>
    <br/>
    <Typography>
      Already have an account? <Button onClick={handleRedirect}>Log In</Button>
    </Typography>
        </div>
        <div className='portrait:hidden'>
          <img className='max-h-[90vh]' src={photo} alt='girl listenning to music'/>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterDialog