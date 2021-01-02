import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";

import LoginRouter from '../Login/LoginRouter'
import Login from "../Login/Login"
import Register from "../Register/Register"

export default function LoginContainer (props) {
  
  const { userCategory, setUserCategory } = props;
  const { currentUser, handleDoctorLogin, handleDoctorRegister, handlePatientLogin, handlePatientRegister } = props;
  const history = useHistory();

  const returnToLoginRouter = () => {
    setUserCategory("")
    history.push('/')
  }

  return (
  
    <div className='login-container'>

      { (!currentUser && (userCategory === "doctor" || userCategory === "patient")) ?

        <>
        
        { userCategory === "doctor" ?
       
            <Switch>
                
              <Route path="/doctor-login">
                <Login
                  handleLogin={handleDoctorLogin} 
                  returnToLoginRouter={returnToLoginRouter}
                /> 
              </Route>
                
              <Route path="/doctor-register">
                <Register
                  handleRegister={handleDoctorRegister}  
                /> 
              </Route>
                
            </Switch >
          
        :
          
        <>
            <Switch>
                
            <Route path="/patient-login">
              <Login
                  handleLogin={handlePatientLogin}
                  returnToLoginRouter={returnToLoginRouter}
              />  
            </Route>
                
            <Route path="/patient-register">
              <Register
                handleRegister={handlePatientRegister}  
              /> 
            </Route>
                
          </Switch >
        </>
        
        }

       </>   
      
    :
      <Switch>
        <Route exact path="/">
            
            <LoginRouter setUserCategory={setUserCategory} />
            
        </Route >
      </Switch>
  
    }
   </div> 
  )
}