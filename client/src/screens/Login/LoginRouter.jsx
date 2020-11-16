import React, {useState} from 'react'
import { Switch, Route, useHistory } from "react-router-dom";

import DoctorLogin from "../Login/DoctorLogin"
import DoctorRegister from "../Register/DoctorRegister"
import PatientLogin from "../Login/PatientLogin"
import PatientRegister from "../Register/PatientRegister"

export default function LoginRouter(props) {
  
  const { handleLogin, handleRegister } = props;
  const [ userCategory, setUserCategory ] = useState("");
  const history = useHistory();

  const handlePatient = () => {
    setUserCategory("patient")
    history.push('/patient-login')
  }

  const handleDoctor = () => {
    setUserCategory("doctor")
    history.push('/doctor-login')
  }

  const returnToLoginRouter = () => {
    setUserCategory("")
    history.push('/')
  }


  return (
  
    <>
      { userCategory ?

        <>
        
        { userCategory === "doctor" ?
       
          <div>
            <Switch>
                
              <Route exact path="/doctor-login">
                <DoctorLogin
                  handleLogin={handleLogin} 
                  returnToLoginRouter={returnToLoginRouter}
                /> 
              </Route>
                
              <Route exact path="/doctor-register">
                <DoctorRegister
                  handleRegister={handleRegister}  
                /> 
              </Route>
                
            </Switch >
          </div>
          
          :
          
        <div>
            <Switch>
                
            <Route exact path="/patient-login">
              <PatientLogin
                  handleLogin={handleLogin}
                  returnToLoginRouter={returnToLoginRouter}
              />  
            </Route>
                
            <Route exact path="/patient-register">
              <PatientRegister
                handleRegister={handleRegister}  
              /> 
            </Route>
                
          </Switch >
        </div>
        
        }

       </>   
      
    :
  
    <div>
          
      <div className="login-router-copy container">

        <div className="login-router-copy">ARE YOU A PATIENT OR PROVIDER?</div>    

      </div>   

      <div className="user-type-buttons-container">
          
        <button classNam="patient-login-button" onClick={handlePatient}>PATIENT</button> 
            
        <button className="doctor-login-button" onClick={handleDoctor}>PROVIDER</button>  
            
      </div>

    </div>
        
    }
   </> 
  )
}