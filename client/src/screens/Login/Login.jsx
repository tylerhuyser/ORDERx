import React, { useState } from 'react';

import "../Login/Login.css"

export default function Login (props) {
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;
  const { error, handleLogin, returnToLoginRouter, userRegisterRouter } = props;


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (

    <div className="login-component-container">

      <i className="fas fa-times create-form-back-button" id="login-back-button" onClick={returnToLoginRouter} />

      <div className='login-header-form-container'>
        
        <div className="login-form-header-container">
          <img className="login-form-logo" alt="login-form-logo-symbol-only" src="https://i.imgur.com/71pvLug.png" />
          <p className="login-form-subtitle">MANAGE YOUR PRESCRIPTIONS</p>
        </div> 
      

        <div className="login-form-container">
        
          <form className="login-form" onSubmit={(e) => {
            e.preventDefault();
            handleLogin(formData);
          }}>
          
            <p className="login-form-title">LOGIN</p>
              {
              error &&
            <p className="login-error">{error}</p>
            }
            
            <input
              className="login-form-input"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              className="login-form-input"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          
            <p className="password-recovery-copy">Forgot your password?</p>

            <button className="sign-in-button">SIGN IN</button>
          
          </form>

          <div className="register-prompt-container">
            
            <p className="register-prompt-copy">Don't have an account?</p>
        
            <button className="register-button" onClick={userRegisterRouter}>SIGN UP</button>
          
          </div>  

        </div>

      </div>

    </div>
    
  )
}