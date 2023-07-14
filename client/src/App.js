import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  const token = localStorage.getItem("token");
  
  return (
    <Routes>
      {token ? (
        <><Route path="/" element={<Dashboard />} /><Route path="/settings" element={<Settings />} /></>
      ) : (
        <Route path="/" element={<Home />} />
      )}
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}


export default App;
