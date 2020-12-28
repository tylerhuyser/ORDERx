import React from 'react'
import { useHistory, Link } from 'react-router-dom';

export default function LoginRouter(props) {

  const history = useHistory();
  
  const { setUserCategory } = props
  
  const handlePatient = () => {
    setUserCategory("patient")
    history.push('/patient-login')
  }

  const handleDoctor = () => {
    setUserCategory("doctor")
    history.push('/doctor-login')
  }

  return (
  
    <div>
          
      <div className="login-router-copy container">

        <div className="login-router-copy">ARE YOU A PATIENT OR PROVIDER?</div>    

      </div>   

      <div className="user-type-buttons-container">
          
        <Link to="patient-login"><button className="patient-login-button" onClick={handlePatient}>PATIENT</button></Link> 
            
        <Link to="doctor-login"><button className="doctor-login-button" onClick={handleDoctor}>PROVIDER</button></Link>  
            
      </div>

    </div>
      
  )
}