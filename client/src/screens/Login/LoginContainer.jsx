import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";

import LoginRouter from '../Login/LoginRouter'
import DoctorLogin from "../Login/DoctorLogin"
import DoctorRegister from "../Register/DoctorRegister"
import PatientLogin from "../Login/PatientLogin"
import PatientRegister from "../Register/PatientRegister"

export default function LoginContainer (props) {
  
  const { userCategory, setUserCategory } = props;
  const { handleLogin, handleRegister } = props;
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
                <DoctorLogin
                  handleLogin={handleLogin} 
                  returnToLoginRouter={returnToLoginRouter}
                /> 
              </Route>
                
              <Route path="/doctor-register">
                <DoctorRegister
                  handleRegister={handleRegister}  
                /> 
              </Route>
                
            </Switch >
          
        :
          
        <div>
            <Switch>
                
            <Route path="/patient-login">
              <PatientLogin
                  handleLogin={handleLogin}
                  returnToLoginRouter={returnToLoginRouter}
              />  
            </Route>
                
            <Route path="/patient-register">
              <PatientRegister
                handleRegister={handleRegister}  
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