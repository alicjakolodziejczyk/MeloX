import React, { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import '../assets/css/AuthForm.css';
import '../assets/css/Buttons.css';
import photo from '../assets/images/group-dancing.jpg';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [finalError, setFinalError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    if (id === 'name') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, name: 'Name is required' }));
      } else {
        setData((prevState) => ({ ...prevState, name: value }));
        setError((prevState) => ({ ...prevState, name: '' }));
      }
    } else if (id === 'email') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, email: 'Email is required' }));
      } else if (!validator.isEmail(value)) {
        setError((prevState) => ({ ...prevState, email: 'Invalid email' }));
      } else {
        setData((prevState) => ({ ...prevState, email: value }));
        setError((prevState) => ({ ...prevState, email: '' }));
      }
    } else if (id === 'password') {
      if (value.trim() === '') {
        setError((prevState) => ({ ...prevState, password: 'Password is required' }));
      } else if (value.trim().length < 8) {
        setError((prevState) => ({ ...prevState, password: 'Password must be at least 8 characters' }));
      } else if (!validator.matches(value, /\d/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a number' }));
      } else if (!validator.matches(value, /[a-z]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a lowercase letter' }));
      } else if (!validator.matches(value, /[A-Z]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain an uppercase letter' }));
      } else if (!validator.matches(value, /[!@#$%^&*(),.?":{}|<>]/)) {
        setError((prevState) => ({ ...prevState, password: 'Password must contain a special character' }));
      } else {
        setData((prevState) => ({ ...prevState, password: value }));
        setError((prevState) => ({ ...prevState, password: '' }));
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost:8080/api/auth/register';
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.post(url, userData, { headers });
      localStorage.setItem('token', response.data.token);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setFinalError(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="form-container">
          <h1 className="neon-text2">Sign Up</h1>
          <form>
            <label htmlFor="name">
              <input type="text" id="name" placeholder="Name" onChange={handleChange} />
              <span>Name</span>
            </label>
            {error.name !== '' && <p className="error">{error.name}</p>}
            <label htmlFor="email">
              <input type="email" id="email" placeholder="Email" onChange={handleChange} />
              <span>Email</span>
            </label>
            {error.email !== '' && <p className="error">{error.email}</p>}
            <label htmlFor="password">
              <input type="password" id="password" placeholder="Password" onChange={handleChange} />
              <span>Password</span>
            </label>
            {error.password !== '' && <p className="error">{error.password}</p>}
            <label htmlFor="passwordConfirm">
              <input type="password" id="passwordConfirm" placeholder="Confirm Password" onChange={handleChange} />
              <span>Confirm Password</span>
            </label>
            {error.passwordConfirm !== '' && <p className="error">{error.passwordConfirm}</p>}
            <br />
            <button className="btn filled-button" type="button" onClick={handleRegister}>
              Register
            </button>
            {finalError !== '' && <p className="error">{finalError}</p>}
          </form>
          <hr />
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
        <img className="photo" src={photo} alt="A group of people on a silent disco" />
      </div>
    </div>
  );
}

export default Register;
