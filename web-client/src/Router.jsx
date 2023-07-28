import React from 'react'
import {  } from '@mui/icons-material'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import History from './pages/History';
import Favorites from './pages/Favorites';
import Playlists from './pages/Playlists';

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/playlists" element={<Playlists/>} />
      </Routes>
    </div>
  )
}

export default Router