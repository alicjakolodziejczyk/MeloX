import React from 'react'
import { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import '../assets/css/AuthForm.css'
import '../assets/css/Buttons.css'
import photo from '../assets/images/girl-listening.jpg'
import google from '../assets/images/google-icon.png'

function Login() {
  const [data, setData] = useState({email: '', password: ''})
  const [error, setError] = useState({email: '', password: ''})
  const [finalError, setFinalError] = useState('')
  const handleChange = ({currentTarget: input}) => {
    if (input.id === 'email') {
      if (input.value.trim() === '') {
        setError({...error, email: 'Email is required'})
      }else if (!validator.isEmail(input.value)) {
        setError({...error, email: 'Invalid email'})
      }else {
        setData({...data, email: input.value})
        setError({...error, email: ''})
      }
    } else if (input.id === 'password') {
      if (input.value.trim() === '') {
        setError({...error, password: 'Password is required'})
      }else if (input.value.trim().length < 8) {
        setError({...error, password: 'Password must be at least 8 characters'})
      } else if(!validator.matches(input.value, /\d/)) {
        setError({...error, password: 'Password must contain a number'})
      } else if(!validator.matches(input.value, /[a-z]/)) {
        setError({...error, password: 'Password must contain an lowercase letter'})
      } else if(!validator.matches(input.value, /[A-Z]/)) {
        setError({...error, password: 'Password must contain an uppercase letter'})
      } else if(!validator.matches(input.value, /[!@#$%^&*(),.?":{}|<>]/)) {
        setError({...error, password: 'Password must contain a special character'})
      } else {
        setData({...data, password: input.value})
        setError({...error, password: ''})
      }
    } else if (input.id === 'passwordConfirm') {
      if (input.value.trim() === '') {
        setError({...error, passwordConfirm: 'Password confirmation is required'})
      }else if (input.value.trim() !== data.password) {
        setError({...error, passwordConfirm: 'Passwords do not match'})
      } else {
        setData({...data, passwordConfirm: input.value})
        setError({...error, passwordConfirm: ''})
      }
    }
    
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth/login";
      const headers = {
        'Content-Type': 'application/json'
      };
      const { data: { token } } = await axios.post(url, data, {headers}); // Destructure the token from the response data
      localStorage.setItem("token", token); // Store the token in localStorage
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFinalError(error.response.data.message);
      }
    }
  };
  

  return (
    <div className="body">
      <div className="container">
        <div className='form-container'>
          <h1 className='neon-text2'>Login</h1>
          <form>
            <label for="email">
              <input type="email" id="email" placeholder="Email" onChange={handleChange}/>
              <span>Email</span>
            </label>
            {error.email !== '' && <p className="error">{error.email}</p>}
            <label for="password">
              <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
              <span>Password</span>
            </label>
            {error.password !== '' && <p className="error">{error.password}</p>}
            <br/>
        <button className='btn filled-button' type="button" onClick={handleLogin}>Sign Up</button>
        {finalError !== '' && <p className="error">{finalError}</p>}
    </form>
          <hr/>
          {/* <button className='btn transparent-button' ><img className='icon' src={google} alt="google icon"/>Sign in with google</button>
          <button className='btn transparent-button' ><img className='icon' src={google} alt="google icon"/>Sign in with google</button> */}
          <p>Don't have an account? <a href='/signup'>Sign Up</a></p>

        </div>
        <img className="photo" src={photo} alt="A group of people on a silent disco" />
      </div>
    </div>
  )
}

export default Login