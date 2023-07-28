import './App.css';
import Temporary from './components/Temporary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import pink from '@mui/material/colors/pink';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: pink
  },
});

function App() {
  const token = localStorage.getItem("token");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8080/api/user/authenticate', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      .then(res => {
        setAuth(true);
        console.log(res.data);
      })
      .catch(err => console.log(err));
    }else{
      setAuth(false)
    }
  }, [token, auth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {auth ? <Temporary/> : <Home/>}
    </ThemeProvider>
  );
}

export default App;
