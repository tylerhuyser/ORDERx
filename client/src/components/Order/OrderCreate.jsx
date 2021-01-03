import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import '../Order/OrderCreate.css'

import {
  postOrder
} from '../../services/orders'


import {
  postMedication
} from '../../services/medications'

export default function OrderCreate (props) {

  const [createMedication, setCreateMedication] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const { currentUser, userCategory, doctors, patients, medications } = props
  const userID = currentUser.id
  const currentDate = Date.prototype.now
  const history = useHistory()
  
  const [orderFormData, setOrderFormData] = useState({
  
    date: currentDate,
    medication_id: "",
    patient_id: "",
    doctor_id: "",
    pharmacy_address: "",
    filled: false

  })

  const [medicationFormData, setMedicationFormData] = useState({

    name: "",
    dosage: "",
    patient_id: ""

  })

  useEffect(() => {
    if (userCategory === 'doctor') {
      setOrderFormData(prevState => ({
        ...prevState,
        doctor_id: userID
      }))
    } else if (userCategory === 'patient') {
      setOrderFormData(prevState => ({
        ...prevState,
        patient_id: userID
      }))
      setMedicationFormData(prevState => ({
        ...prevState,
        patient_id: userID
      }))
    }
  }, [userCategory])

  const [validateMedication, setValidateMedication] = useState(false)
  const [validatePatient, setValidatePatient] = useState(false)
  const [validateDoctor, setValidateDoctor] = useState(false)
  const [validatePharmacyAddress, setValidatePharmacyAddress] = useState(false)
  const [validateMedicationName, setValidateMedicationName] = useState(false)
  const [validateMedicationDosage, setValidateMedicationDosage ] = useState(false)
  
  const handleChangeOrder = (e) => {
    let { name, value } = e.target;
    if (name === "doctor_id" || name === "patient_id" || name === "medication_id") {
      value = parseInt(value)
      setOrderFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    else {
      setOrderFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }
    
  const handleChangeMedication = (e) => {
    let { name, value } = e.target;
    if (name === "patient_id") {
      value = parseInt(value)
      setMedicationFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    else {
       setMedicationFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    if (createMedication) {
      validateMedicationForm()
    } else {
      validateOrderForm()
    }
  }

  const handleSubmitOrder = async () => {
    const created = await postOrder(orderFormData);
    setIsCreated({ created });
  };

  const handleSubmitMedication = async () => {
    const created = await postMedication(medicationFormData);
    setOrderFormData(prevState => ({
      ...prevState,
      patient_id: created.id
    }))
    validateOrderForm()
  };

  if (isCreated) {
    return <Redirect to={`/orders`} />;
  }

  const validateOrderForm = () => {

    setValidateDoctor(false)
    setValidatePatient(false)
    setValidateMedication(false)
    setValidatePharmacyAddress(false)

    if (userCategory === 'doctor') {
     
      if (orderFormData.medication_id === "") {
        setValidateMedication(true)
        alert('Please select a medication')
        return false
      }
      if (orderFormData.patient_id === "") {
        setValidatePatient(true)
        alert('Please select a patient')
        return false
      }
      if (orderFormData.pharmacy_address === "") {
        setValidatePharmacyAddress(true)
        alert('Please include a valid address')
        return false
      }
      if (orderFormData.medication_id !== "" && orderFormData.patient_id !== "" && orderFormData.doctor_id !== "" && orderFormData.pharmacy_address !== "") {
        handleSubmitOrder(orderFormData)
      }
    }

    else if (userCategory === 'patient') {

      if (orderFormData.medication_id === "") {
        setValidateMedication(true)
        alert('Please select a medication')
        return false
      }
      if (orderFormData.doctor_id === "") {
        setValidateDoctor(true)
        alert('Please select a doctor')
        return false
      }
      if (orderFormData.pharmacy_address === "") {
        setValidatePharmacyAddress(true)
        alert('Please include a valid address')
        return false
      }
      if (orderFormData.medication_id !== "" && orderFormData.patient_id !== "" && orderFormData.doctor_id !== "" && orderFormData.pharmacy_address !== "") {
        handleSubmitOrder(orderFormData)
      }
    }
  }

  const validateMedicationForm = () => {

    setValidateMedicationName(false)
    setValidateMedicationDosage(false)

    if (medicationFormData.name === "") {
      setValidateMedicationName(true)
      alert('Please input a medication name!')
      return false
    }
    if (medicationFormData.dosage === "") {
      setValidateMedicationDosage(true)
      alert('Please input medication dosage!')
      return false
    }
    if (medicationFormData.name !== "" && medicationFormData.dosage !== "" && medicationFormData.patient_id !== "") {
      handleSubmitMedication(medicationFormData)
    }
  }

  const activateMedicationForm = (e) => {
    e.preventDefault()
    setCreateMedication(!createMedication)
  }

  const returnHome = () => {
    history.push('/home')
  }


  return (
    <div className="create-order-container">

      <div className="create-order-form-container">

        <div className="create-order-form-header">

          <i className="fas fa-chevron-left create-form-back-button" onClick={returnHome} />

          <p className="create-order-form-title">Submit An Order</p>

        </div>

        <div className="order-form-container">

          <div className="placeholder-div"></div>

          <form className="create-order-form" onSubmit={
            
          (e) => {
            handleSubmit(e)
          }} >

            { (userCategory && userCategory === 'patient') ?

              <label className="create-form-label">
                Doctor
                <select className={validateDoctor ? "create-order-form-input invalid" : "create-order-form-input"} defaultValue='default' name="doctor_id" onChange={handleChangeOrder}>
                <option disabled value='default'>-- Select Doctor --</option>
                {doctors.map(doctor => (
                  <option value={doctor.id} key={doctor.id}>{`${doctor.last_name}, ${doctor.first_name}`}</option>
                ))}
                </select>
              </label>

              :

              <>
              </>

            }

            {(userCategory && userCategory === 'doctor') ?
                
            <label className="create-form-label">
              Patient
              <select className={validatePatient ? "create-order-form-input invalid" : "create-order-form-input"} defaultValue='default' name="medication_id" onChange={handleChangeOrder}>
              <option disabled value='default'>-- Select Patient --</option>
              {patients.map(patient => (
                <option value={patient.id} key={patient.id}>{`${patient.last_name}, ${patient.first_name}`}</option>
              ))}
              </select>
            </label>

            :

            <>
            </>

            }

            {(userCategory && userCategory === 'doctor') ?
              
            <>
              
              <label className="create-form-label">
                Medication
                <select className={validateMedication ? "create-order-form-input invalid" : "create-order-form-input"} defaultValue='default' name="medication_id" onChange={handleChangeOrder}>
                <option disabled value='default'>-- Select Your Medication --</option>
                {medications.map(medication => (
                  <option value={medication.id} key={medication.id}>{`${medication.last_name}, ${medication.first_name}`}</option>
                ))}
                </select>
              </label>
                  
              <div className="create-medication-form-container">
                     
                  <p className="create-medication-form-title">CREATE MEDICATION</p>

                  <label className="create-form-label" id="medication-form-radio">
                    Add New Medication? 
                    <input
                      type="radio"
                      className="radio-input"
                      name="createMedication"
                      onChange={activateMedicationForm}
                    />
                  </label>

                { createMedication ?
                    
                  <form className="create-medication-form" onSubmit={
            
                    (e) => {
                    handleSubmit(e)
                      
                  }} >

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
                    
                  </form>
                :

                  <>
                  </>
                        
                }

              </div>

            </>

              :

            <>
            </>

            }

            <label className="create-form-label">
              Pharmacy Address
              <input className={validatePharmacyAddress ? "create-order-form-input invalid" : "create-order-form-input"}
                    type="pharmacy_address"
                    value={orderFormData.pharmacy_address}
                    name="pharmacy_address"
                    onChange={handleChangeOrder}
              />
            </label>

            <button className="submit-button" id="create-order-form-button">SUBMIT</button>

          </form>

        </div>

      </div>

    </div>
  )
  
}