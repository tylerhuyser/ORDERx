import React from 'react'
import './MedicationCreate.css'

export default function MedicationCreate(props) {

  const { medicationFormData } = props
  const { validateMedicationName, validateMedicationDosage } = props;
  const { handleChangeMedication } = props

  
  return (
    <div className="create-medication-form">
        
      <p className="create-medication-form-title">CREATE MEDICATION</p>

      <label className="create-form-label">
        Medication Name
      <input className={validateMedicationName ? "create-order-form-input invalid" : "create-order-form-input"}
            type="name"
            value={medicationFormData.name}
            name="name"
            onChange={handleChangeMedication}
      />
      </label> 

      <label className="create-form-label">
        Dosage
      <input className={validateMedicationDosage ? "create-order-form-input invalid" : "create-order-form-input"}
            type="dosage"
            value={medicationFormData.dosage}
            name="dosage"
            onChange={handleChangeMedication}
      />
      </label>
      
    </div>
  )
}