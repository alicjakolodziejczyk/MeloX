import React from 'react'
import { useState } from 'react'
import "../assets/css/MusicPlayer.css"
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
function Player() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className='music-container' style={{height: collapsed ? "100px" : "90vh"}}>
      <button className='collapsed-btn' onClick={() => setCollapsed(!collapsed)}>{collapsed ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/> }</button>
    </div>
  )
}

export default Player