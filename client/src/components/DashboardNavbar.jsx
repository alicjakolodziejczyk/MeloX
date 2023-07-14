import logo from '../assets/images/melox.png'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../assets/css/Navbar.css'


const DashboardNavbar = () => {
  const navigate = useNavigate()
 

  return (
    <div>
      <nav className="navbar">
        <img className='logo' src={logo} alt="logo" />
        <div className="nav-buttons">
        </div>
      </nav>
    </div>
  )
}

export default DashboardNavbar