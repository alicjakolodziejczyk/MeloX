import logo from '../assets/images/melox.png'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../assets/css/Navbar.css'


const HomeNavbar = () => {
  const navigate = useNavigate()
  const goToLogin = () => {
    navigate('/login')
  }

  const goToRegister = () => {
    navigate('/signup')
  }

  return (
    <div>
      <nav className="navbar">
        <img className='logo' src={logo} alt="logo" />
        <div className="nav-buttons">
          <button className="button framed-button" onClick={goToRegister}>Sign In</button>
          <button className="button filled-button" onClick={goToLogin}> Log In</button>
        </div>
      </nav>
    </div>
  )
}

export default HomeNavbar