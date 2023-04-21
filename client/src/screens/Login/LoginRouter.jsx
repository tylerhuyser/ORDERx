import React from 'react'
import { useHistory, Link } from 'react-router-dom';

import "../Login/LoginRouter.css"

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

    <>
  
      <div className="login-router-container-desktop">

        <div className='doctor-login-container'>
          <p className='doctor-login-title'>Are you a Provider?</p>
          <p className='doctor-login-subtitle'>Here to manage your patients?</p>
          <button className="login-router-button" id="doctor-login-button" onClick={handleDoctor}>LOGIN</button>
        </div>

        <div className='patient-login-container'>
          <p className='patient-login-title'>Are you a Patient?</p>
          <p className='patient-login-subtitle'>Looking to track your prescriptions?</p>
          <button className="login-router-button" id="doctor-login-button" onClick={handleDoctor}>LOGIN</button>
        </div>

      </div>

        {/* <div className='login-router-container-patient'>
          
        </div>

        <div className="login-actions-container">
            
          <div className="login-router-copy-container">

            <div className="login-router-copy">ARE YOU A... ?</div>    

          </div>   

          <div className="user-type-buttons-container">
              
            <Link to="patient-login"><button className="login-router-button" id="patient-login-button" onClick={handlePatient}>PATIENT</button></Link> 
                
            <Link to="doctor-login"><button className="login-router-button" id="doctor-login-button" onClick={handleDoctor}>PROVIDER</button></Link>  
                
          </div>

        </div>

        <img className="login-router-hero-image" src="https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" />
          
      </div>

      <div className="login-router-container-mobile">
          
          <div className="login-router-copy-container-mobile">
    
            <div className="login-router-copy">ARE YOU A PATIENT OR PROVIDER?</div>    
    
          </div>   
    
          <div className="user-type-buttons-container">
              
            <Link to="patient-login"><button className="login-router-button" id="patient-login-button" onClick={handlePatient}>PATIENT</button></Link> 
                
            <Link to="doctor-login"><button className="login-router-button" id="doctor-login-button" onClick={handleDoctor}>PROVIDER</button></Link>  
                
          </div>
        
        <img className="login-router-hero-image-mobile" src="https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" />
    
        </div> */}
      
    </>
  )
}