import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import girl from '../images/girl.png'
import LoginDialog from '../components/LoginDialog'
import RegisterDialog from '../components/RegisterDialog'

function Home() {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  

  const handleOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  return (
    <div className='h-screen w-screen'>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='justify-end'>
        <h1 className='text-3xl p-2 mr-auto' style={{fontFamily: 'GlitchGoblin', textShadow: '#e91e63 1px 1px, #3993dd -1px -1px'}}>MELOX</h1>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={handleOpenLogin}>Login</Button>
          <Button variant="contained" color="primary" onClick={handleOpenRegister}>Register</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
    <div className='flex landscape:flex-row flex-col-reverse w-screen'>
        <div className='p-8 flex flex-col landscape:w-1/2 w-screen justify-center text-center'>
          <h1 className='text-5xl p-4 leading-[2.75rem]' style={{fontFamily: 'GlitchGoblin', textShadow: '#e91e63 2px 2px, #3993dd -2px -2px'}}>Unleash the MeloXperience</h1>
          <h3 className='text-2xl p-2' style={{fontFamily: 'GlitchGoblin', textShadow: '#e91e63 1px 1px, #3993dd -1px -1px'}}>Dive into a world of limitless music streaming!</h3>
        </div>
        <div className='flex m-auto justify-center landscape:w-1/2 w-3/4'>
          <img  className=' p-8 flex rounded-full landscape:max-h-[75vh] portrait:max-h-[45vh] justify-center' src={girl} alt="girl with headphones" />
        </div>
        
      </div>
      <footer className='absolute bottom-2 left-0 right-0 m-auto'>
        <p className='text-center'>© 2023 Melox by Alicja Kołodziejczyk</p>
      </footer>
      <LoginDialog open={openLogin} onClose={handleCloseLogin} handleOpenRegister={handleOpenRegister} />
      <RegisterDialog open={openRegister} onClose={handleCloseRegister} handleOpenLogin={handleOpenLogin} />
    </div>
  )
}

export default Home
