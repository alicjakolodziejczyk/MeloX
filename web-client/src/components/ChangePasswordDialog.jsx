import React from 'react'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import validator from 'validator'
import {useState} from 'react'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function ChangePasswordDialog(props) {
  const {onClose, open, handleOpenSnackbar, handleCloseSnackbar, setSeverity, setMessage} = props

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [data, setData] = useState({currentPassword: '', password: '', passwordConfirm: ''})
  const [error, setError] = useState({currentPassword: '', password: '', passwordConfirm: ''})
  const [finalError, setFinalError] = useState('')
  const handleChange = ({currentTarget: input}) => {
    if (input.id === 'currentPassword') {
      if (input.value.trim() === '') {
        setError({...error, currentPassword: 'Current password is required'})
      } else {
        setData({...data, currentPassword: input.value})
        setError({...error, currentPassword: ''})
      }
    }
    else if (input.id === 'password') {
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
        setError({...error, passwordConfirm: 'Confirm password is required'})
      } else if (input.value.trim() !== data.password) {
        setError({...error, passwordConfirm: 'Passwords do not match'})
      } else {
        setData({...data, passwordConfirm: input.value})
        setError({...error, passwordConfirm: ''})
      }
    }
  }



  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/user/change-password";
      const userData = {
        currentPassword: data.currentPassword,
        password: data.password,
      };
  
      const token = localStorage.getItem("token"); 
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
         'x-access-token': token
      };
  
      await axios.put(url, userData, { headers });
      setSeverity("success")
      setMessage('Password changed successfully.')
      handleOpenSnackbar()
      onClose()
    } catch (error) {
      setSeverity("error")
      setMessage('Password change failed. Please try again.')
      handleOpenSnackbar()
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFinalError(error.response.data.message);
      }
    }
  };
  return (
   <Dialog onClose={onClose} open={open} maxWidth='md'>
      <div className='px-16 py-8'>
        <IconButton onClick={onClose} sx={{position: 'absolute'}} className='top-2 right-2'><CloseRoundedIcon/></IconButton>
        <form>
          <Stack spacing={2}>
            <Typography variant="h5" component="h1" className='text-center' gutterBottom>Change Password</Typography>
            {finalError !== '' && <Typography variant="contained" color="error">{finalError}</Typography>}
            <FormControl error={error.currentPassword !== ''} variant="standard">
                  <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                  <Input
                    id="currentPassword"
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
                    aria-describedby="currentPassword-text"
                  />
                  <FormHelperText id="currentPassword-text">{error.currentPassword}</FormHelperText>
                </FormControl>

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

                <FormControl error={error.passwordConfirm !== ''} variant="standard">
                  <InputLabel htmlFor="passwordConfirm">Confirm Password</InputLabel>
                  <Input
                    id="passwordConfirm"
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
                    aria-describedby="passwordConfirm-text"
                  />
                  <FormHelperText id="passwordConfirm-text">{error.passwordConfirm}</FormHelperText>
                </FormControl>
                
                <Button variant="contained" color="primary" onClick={handleSetNewPassword}>Change Password</Button>
          </Stack>
        </form>
      </div>
      
    </Dialog>
  )
}

export default ChangePasswordDialog