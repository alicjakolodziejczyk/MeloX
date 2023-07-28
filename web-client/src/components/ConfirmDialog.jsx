import React from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function ConfirmDialog(props) {
  const { onClose, open, onConfirm, title } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <div className='px-16 pt-2 pb-8'>
        <Typography variant="h6" component="h1" className='py-6' gutterBottom>{title}</Typography>
        <Stack spacing={3} direction='row' className='justify-center'>
          <Button variant="contained" color='error' className='w-fit' onClick={onConfirm}>Detele</Button>
          <Button variant="contained" color='inherit' className='w-fit' onClick={onClose}>Cancel</Button>
        </Stack>
      </div>
      
    </Dialog>
  )
}

export default ConfirmDialog