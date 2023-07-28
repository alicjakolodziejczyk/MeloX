import React from 'react'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import AlertPopup from '../components/AlertPopup';


function Settings() {
  const [finalError, setFinalError] = useState('')
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);

  const handleOpenDeleteAccount = () => setOpenDeleteAccount(true);
  const handleCloseDeleteAccount = () => setOpenDeleteAccount(false);

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const handleDeleteAccount = async (e) => {
    console.log('deleteAccount')
    e.preventDefault()
    try {
      const url = "http://localhost:8080/api/user/delete"
      const token = await localStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
         'x-access-token': token
      };
      const { data: res } = await axios.delete(url, {headers})
      localStorage.removeItem('token')
      window.location = "/"
    } catch (error) {
      setSnackbarSeverity('error')
      setSnackbarMessage('Error deleting account. Please try again.')
      setOpenSnackbar(true)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFinalError(error.response.data.message)
      }
    }
  };

  return (
    <div className='px-4'>
      <Typography variant="h4" component="h1" className='py-6' gutterBottom>Settings</Typography>
      <Stack spacing={3}>
        <Button variant="contained" color='inherit' className='w-fit' onClick={handleOpenChangePassword}>Change Password</Button>
        <Button variant="contained" color='error' className='w-fit' onClick={handleOpenDeleteAccount}>Delete Account</Button>
      </Stack>
      <ChangePasswordDialog open={openChangePassword} onClose={handleCloseChangePassword} handleOpenSnackbar={handleOpenSnackbar} handleCloseSnackbar={handleCloseSnackbar} setSeverity={setSnackbarSeverity} setMessage={setSnackbarMessage}/>
      <ConfirmDialog open={openDeleteAccount} onClose={handleCloseDeleteAccount} onConfirm={handleDeleteAccount} title='Are you sure you want to delete your account?'/>
      <AlertPopup open={openSnackbar} onClose={handleCloseSnackbar} severity={snackbarSeverity} message={snackbarMessage}/>
    </div>
  )
}

export default Settings