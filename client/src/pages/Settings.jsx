import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardSidebar from '../components/DashboardSidebar';
import validator from 'validator'
import axios from 'axios'
import '../assets/css/Buttons.css';

function Settings() {
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
;

  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    try {
      const url = "http://localhost:8080/api/user/delete"
      const token = await localStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
         'x-access-token': token
      };
      const { data: res } = await axios.delete(url, {headers})
      localStorage.removeItem('token')
      window.location = "/"
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setFinalError(error.response.data.message)
      }
    }
  };

  const [data, setData] = useState({currentPassword: '', password: '', passwordConfirm: ''})
  const [error, setError] = useState({currentPassword: '', password: '', passwordConfirm: ''})
  const [finalError, setFinalError] = useState('')
  const handleChange = ({currentTarget: input}) => {
    if (input.id === 'currentPassword') {
      if (input.value.trim() === '') {
        setError({...error, currentPassword: 'Current password is required'})
      } else {
        setData({...data, currentPassword: input.value})
        setError({...error, currentPassword: ''})
      }
    }
    else if (input.id === 'password') {
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
    } else if (input.type === 'passwordConfirm') {
      if (input.value.trim() === '') {
        setError({...error, passwordConfirm: 'Confirm password is required'})
      } else if (input.value.trim() !== data.password) {
        setError({...error, passwordConfirm: 'Passwords do not match'})
      } else {
        setData({...data, passwordConfirm: input.value})
        setError({...error, passwordConfirm: ''})
      }
    }
  }



  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/user/change-password";
      const userData = {
        currentPassword: data.currentPassword,
        password: data.password,
      };
  
      // Add the JWT token to the request headers
      const token = localStorage.getItem("token"); 
      console.log(token)
      const headers = {
        'Content-Type': 'application/json',
         'x-access-token': token
      };
  
      const { data: res } = await axios.put(url, userData, { headers });
      window.location = "/settings";
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
    <div>
      <DashboardNavbar />
      <div className="dashboard-container">
        <DashboardSidebar />
        <div className="main-content">
          <div style={{ flexDirection: 'column', padding: '5vh' }}>
            <h1>Settings</h1>
            {changePassword ? (
              <div>
                <h3>Change Password</h3>
                <br />
                <form>
            
            <label htmlFor="currentPassword">
              <input type="password" id="currentPassword" placeholder="Current Password" onChange={handleChange}/>
              <span>Current Password</span>
            </label>
            {error.email !== '' && <p className="error">{error.email}</p>}
            <label htmlFor="password">
              <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
              <span>Password</span>
            </label>
            {error.password !== '' && <p className="error">{error.password}</p>}
            <label htmlFor="passwordConfirm">
              <input type="password" id="passwordConfirm" placeholder="Confirm Password" onChange={handleChange}/>
              <span>Confirm Password</span>
            </label>
            {error.passwordConfirm !== '' && <p className="error">{error.passwordConfirm}</p>}
            <br/>
        <button className='btn filled-button' type="button" onClick={handleSetNewPassword}>Change Password</button>
        {finalError !== '' && <p className="error">{finalError}</p>}
    </form>
              </div>
            ) : (
              <>
                <button className='btn filled-button' type="button" onClick={() => setChangePassword(true)}>Change password</button><br /><br />
              </>
            )}

            {deleteAccount ? (
              <div>
                <h3>Are you sure you want to delete your account?</h3>
                <button className='btn warning-button filled-button' onClick={handleDeleteAccount}>Delete</button>
                <br/><button className='btn cancel-button filled-button' onClick={() => setDeleteAccount(false)}>Cancel</button>
              </div>
            ) : (
              <button className='btn warning-button filled-button' type="button" onClick={() => setDeleteAccount(true)}>Delete Account</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
