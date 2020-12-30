import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";

import LoginRouter from '../Login/LoginRouter'
import Login from "../Login/Login"
import Register from "../Register/Register"

export default function LoginContainer (props) {
  
  const { userCategory, setUserCategory } = props;
  const { handleDoctorLogin, handleDoctorRegister, handlePatientLogin, handlePatientRegister } = props;
  const history = useHistory();

  const returnToLoginRouter = () => {
    setUserCategory("")
    history.push('/')
  }

  return (
  
    <div className='login-container'>

      { userCategory === "doctor" || userCategory === "patient" ?

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
          
        <div>
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
        </div>
        
        }

       </>   
      
    :
  
        <LoginRouter setUserCategory={setUserCategory} />
        
    }
   </div> 
  )
}