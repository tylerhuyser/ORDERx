import React, { useState } from 'react';
import { Link } from "react-router-dom";

import "../Login/Login.css"

export default function DoctorLogin (props) {
  
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
        
        <div className="login-form-header">
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
            
            <label className="login-form-label">
                  E-mail:
              <input
                className="login-form-input"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </label><br/>

            <label className="login-form-label">
              Password:
              <input
                className="login-form-input"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </label><br />
          
            <p className="password-recovery-copy">Forgot your password?</p>

            <button className="sign-in-button">SIGN IN</button>
          
          </form>

          <div className="register-prompt-container">
            
            <p className="register-prompt-copy">Don't have an account?</p>
        
            <button className="register-button" onClick={userRegisterRouter}>SIGN UP</button>
          
          </div>  

        </div>

    </div>
    
  )
}