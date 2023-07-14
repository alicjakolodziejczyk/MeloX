import React from 'react'
import girl from '../assets/images/girl.png'
import '../assets/css/Home.css'
import '../assets/css/Buttons.css'
import HomeNavbar from '../components/HomeNavbar'

function Home() {
  return (
    <div>
      <HomeNavbar />
      <div className="main-container">
        <div className="text">
          <h1 className='neon-text'>Unleash the MeloXperience</h1>
          <h3 className='neon-text2'>Dive into a world of limitless music streaming!</h3>
        </div>
        <div className='image-container'>
          <img src={girl} alt="girl with headphones" />
        </div>
        
      </div>
      <footer className="footer">
        <p>© 2023 Melox by Alicja Kołodziejczyk</p>
      </footer>
    </div>
  )
}

export default Home