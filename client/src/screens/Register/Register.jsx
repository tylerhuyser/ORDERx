import React, { useState } from 'react'
import './Register.css'


export default function Register(props) {

  const { handleRegister, currentUser, userCategory } = props

  const { registerFormData, setRegisterFormData } = props


  // Patient Form Validators
  const [validateFirstName, setValidateFirstName ] = useState(false)
  const [validateLastName, setValidateLastName] = useState(false)
  const [validateDOB, setValidateDOB] = useState(false)
  const [validateEmail, setValidateEmail ] = useState(false)
  const [validatePassword, setValidatePassword ] = useState(false)

  const handleChange = (e) => {
    let { name, value } = e.target;
    setRegisterFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateRegisterForm = () => {

    setValidateFirstName(false)
    setValidateLastName(false)
    setValidateDOB(false)
    setValidateEmail(false)
    setValidateLastName(false)

    if (registerFormData.first_name === "") {
      setValidateFirstName(true)
      alert("Please include patient's first name!")
      return false
    }
    if (registerFormData.last_name === "") {
      setValidateLastName(true)
      alert("Please include patient's last name!")
      return false
    }
    if (userCategory === 'patient' && registerFormData.date_of_birth === "") {
      setValidateDOB(true)
      alert("Please include patient's date of birth!")
      return false
    }
    if ((registerFormData.email === "" || !registerFormData.email.includes('@') || !registerFormData.email.includes('.') || registerFormData.email.includes('@.'))) {
      setValidateEmail(true)
      alert("Please include patient's email!")
      return false
    }
    if (registerFormData.password === "" || registerFormData.password.length < 8) {
      setValidatePassword(true)
      alert("Please include patient's password!")
      return false
    }
    else {
      handleRegister(registerFormData)
    }
  }
  
  
  return (
    <div className="register-container">

      <div className='register-form-container'>

        <p className="register-form-title">Complete Registration Below</p>

        <input className={validateFirstName ? "create-patient-form-input invalid" : "create-patient-form-input"}
              type="first_name"
              value={registerFormData.first_name}
              name="first_name"
              onChange={handleChange}
              placeholder="First Name"
        />

        <input className={validateLastName ? "create-patient-form-input invalid" : "create-patient-form-input"}
          type="last_name"
          value={registerFormData.last_name}
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
        />

        { currentUser === "patient" ?
          
        <input className={validateDOB ? "create-patient-form-input invalid" : "create-patient-form-input"}
          type="date_of_birth"
          value={registerFormData.date_of_birth}
          name="date_of_birth"
          onChange={handleChange}
          placeholder="Date of Birth (MM/DD/YYYY)"
        />
                  
        :
          
        <>
        </>
          
        }
          
        <input className={validateEmail ? "create-patient-form-input invalid" : "create-patient-form-input"}
          type="email"
          value={registerFormData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />


        <input className={validatePassword ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="password"
            value={registerFormData.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
        />


        <button className="register-form-button" onClick={validateRegisterForm}>REGISTER</button>

      </div>

    </div>
  )
}