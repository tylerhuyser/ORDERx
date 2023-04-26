import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";

import LoginRouter from '../Login/LoginRouter'
import Login from "../Login/Login"
import Register from "../Register/Register"

import "./LoginContainer.css"

export default function LoginContainer (props) {
  
  const { userCategory, setUserCategory } = props;
  const { isCreated, setIsCreated } = props
  const { currentUser, handleDoctorLogin, handleDoctorRegister, handlePatientLogin, handlePatientRegister } = props;
  const history = useHistory();

  const [registerPatientData, setRegisterPatientData] = useState({
  
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    password: "",
    doctor_id: ""

  })

  const [registerDoctorData, setRegisterDoctorData] = useState({

  first_name: "",
  last_name: "",
  email: "",
  password: ""

  })

  const returnToLoginRouter = () => {
    setUserCategory("")
    history.push('/')
  }

  const userRegisterRouter = () => {
    if (userCategory === 'doctor') {
      history.push('/doctor-register')
    } if (userCategory === 'patient') {
      history.push('/patient-register')
    }
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
                  userRegisterRouter={userRegisterRouter}
                /> 
              </Route>
                
              <Route path="/doctor-register">
                <Register
                  handleRegister={handleDoctorRegister}
                  registerFormData={registerDoctorData}
                  setRegisterFormData={setRegisterDoctorData}
                  currentUser={currentUser}
                  userCategory={userCategory}
                  isCreated={isCreated}
                  setIsCreated={setIsCreated}
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
                  userRegisterRouter={userRegisterRouter}
              />  
            </Route>
                
            <Route path="/patient-register">
              <Register
                  handleRegister={handlePatientRegister}
                  registerFormData={registerPatientData}
                  setRegisterFormData={setRegisterPatientData}
                  currentUser={currentUser}  
                  userCategory={userCategory}  
                  isCreated={isCreated}
                  setIsCreated={setIsCreated}
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