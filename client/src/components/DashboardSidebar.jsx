import React from 'react';
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses,
  menuClasses
} from "react-pro-sidebar";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react'
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import PodcastsRoundedIcon from '@mui/icons-material/PodcastsRounded';
import {ReactComponent as Musician} from '../assets/images/musician.svg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import '../assets/css/Sidebar.css'
import { Button } from '@mui/material';


function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const sidebarStyle = {
    [`&.${sidebarClasses.root}`]: {
      color: '#DDDDDD'
    }
  }
  const menuItemStyle = {
    label: {
      fontSize: '20px',
      padding : '0 2vh',

    },
    button: {
      backgroundColor: '#101010',
      padding: '0 2vh',

      '&:hover': {
         backgroundColor: '#191919',
         color: '#FFFFFF'
      },
  }
  }

  const submenuItemStyle = {
    ['.' + menuClasses.subMenuContent]: {
      height: '200px',
      overflow: 'hidden!important',
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
  
  return (
    <div style={{height: '90vh', display: 'flex'}}>
      <Sidebar collapsed={!collapsed} collapsedWidth='10vh' width='30vh' backgroundColor='#101010' rootStyles={sidebarStyle}>
      <div style={{height: '48px'}}><Hamburger rounded toggled={collapsed} toggle={setCollapsed} size={28}/></div>
      
      
      <Menu menuItemStyles={menuItemStyle}>
        <MenuItem icon={<HomeRoundedIcon fontSize='large'/>} component={<Link to="/"/>}> Home </MenuItem>
        <MenuItem icon={<HistoryRoundedIcon fontSize='large'/>} component={<Link to="/history"/>}> History </MenuItem>
        <MenuItem icon={<FavoriteRoundedIcon fontSize='large'/>} component={<Link to="/favorites"/>}> Favorites </MenuItem>
        <SubMenu label="Library" icon={<LibraryMusicRoundedIcon fontSize='large' />}rootStyles={submenuItemStyle}>
            <MenuItem icon={<Musician className='icon'/>} component={<Link to="/"/>}> Artists </MenuItem>
            <MenuItem icon={<AlbumRoundedIcon/>} component={<Link to="/"/>}> Albums </MenuItem>
            <MenuItem icon={<QueueMusicRoundedIcon />} component={<Link to="/"/>}> Playlists </MenuItem>
            <MenuItem icon={<PodcastsRoundedIcon/>} component={<Link to="/"/>}> Podcasts </MenuItem>
        </SubMenu>
      </Menu>
      <div style={{position:'absolute', bottom:'2vh'}}>
        <Menu menuItemStyles={menuItemStyle}> 
          <MenuItem icon={<SettingsRoundedIcon fontSize='large'/>} component={<Link to="/settings"/>}> Settings </MenuItem>
          <MenuItem icon={<LogoutRoundedIcon fontSize='large'/>} component={<Button onClick={handleLogout}/>}> Logout </MenuItem>
        </Menu>
      </div>
      
    </Sidebar></div>
    
  );
}

export default DashboardSidebar;