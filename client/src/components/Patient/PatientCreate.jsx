import React from 'react'

import '../Patient/PatientCreate.css'

export default function PatientCreate(props) {

  const { patientFormData } = props
  const { validatePatientFirstName, validatePatientLastName, validatePatientDOB, validatePatientEmail, validatePatientPassword } = props
  const { handleChangePatient } = props
  
  return (
    <div className="patient-create-form">

      <p className="create-patient-form-title">CREATE PATIENT</p>

      <label className="create-form-label">
        Patient First Name
      <input className={validatePatientFirstName ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="first_name"
            value={patientFormData.first_name}
            name="first_name"
            onChange={handleChangePatient}
      />
      </label> 

      <label className="create-form-label">
        Patient Last Name
      <input className={validatePatientLastName ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="last_name"
            value={patientFormData.last_name}
            name="last_name"
            onChange={handleChangePatient}
      />
      </label>

      <label className="create-form-label">
        Patient Date of Birth (MM/DD/YYYY)
      <input className={validatePatientDOB ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="date_of_birth"
            value={patientFormData.date_of_birth}
            name="date_of_birth"
            onChange={handleChangePatient}
      />
      </label>

      <label className="create-form-label">
        Patient Email
      <input className={validatePatientEmail ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="email"
            value={patientFormData.email}
            name="email"
            onChange={handleChangePatient}
      />
      </label>

      <label className="create-form-label">
        Patient Password
      <input className={validatePatientPassword ? "create-patient-form-input invalid" : "create-patient-form-input"}
            type="password"
            value={patientFormData.password}
            name="password"
            onChange={handleChangePatient}
      />
      </label>

    </div>
  )
}