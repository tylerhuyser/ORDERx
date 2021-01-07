import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import PatientCreate from '../Patient/PatientCreate'
import MedicationCreate from '../Medication/MedicationCreate'

import '../Order/OrderCreate.css'

import {
  getOnePatient
} from '../../services/users'

import {
  createNewPatient
} from '../../services/auth'

import {
  putOrder
} from '../../services/orders'

import {
  postMedication
} from '../../services/medications'

export default function OrderCreate (props) {

  const [createPatient, setCreatePatient] = useState(false)
  const [createMedication, setCreateMedication] = useState(false)
  const [submitMedication, setSubmitMedication] = useState(false)
  const [createOrder, setCreateOrder] = useState(false)

  const [selectedPatientMedications, setSelectedPatientMedications] = useState([])

  const { isCreated, setIsCreated } = props
  const { currentUser, userCategory, doctors, patients, currentOrder, setCurrentOrder, setEditOrder } = props

  const userID = currentUser.id
  const currentDate = new Date()
  const history = useHistory()
  
  const [orderFormData, setOrderFormData] = useState({
  
    id: currentOrder.id,
    date: currentDate,
    medication_id: currentOrder.medication_id,
    patient_id: currentOrder.patient_id,
    doctor_id: currentOrder.doctor_id,
    pharmacy_address: currentOrder.pharmacy_address,
    filled: false

  })

  const [patientFormData, setPatientFormData] = useState({

    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    password: "",
    doctor_id: currentUser.id

  })

  const [medicationFormData, setMedicationFormData] = useState({

    name: "",
    dosage: "",
    patient_id: orderFormData.patient_id

  })

  useEffect(() => {
    if (userCategory === 'doctor') {
      setOrderFormData(prevState => ({
        ...prevState,
        doctor_id: userID
      }))
      setMedicationFormData(prevState => ({
        ...prevState,
        patient_id: userID
      }))
    } else if (userCategory === 'patient') {
      setOrderFormData(prevState => ({
        ...prevState,
        patient_id: userID
      }))
    }
  }, [userCategory])

  useEffect(() => {
    const getCurrentPatientMedications = async (selectedPatientID) => {
      const selectedPatient = await getOnePatient(selectedPatientID)
      setSelectedPatientMedications(selectedPatient.medications)
    }
    getCurrentPatientMedications(orderFormData.patient_id)
  }, [orderFormData.patient_id])

// Order Form Validators 
  const [validateMedication, setValidateMedication] = useState(false)
  const [validatePatient, setValidatePatient] = useState(false)
  const [validateDoctor, setValidateDoctor] = useState(false)
  const [validatePharmacyAddress, setValidatePharmacyAddress] = useState(false)

// Medication Form Validators
  const [validateMedicationName, setValidateMedicationName] = useState(false)
  const [validateMedicationDosage, setValidateMedicationDosage] = useState(false)

// Patient Form Validators
  const [validatePatientFirstName, setValidatePatientFirstName ] = useState(false)
  const [validatePatientLastName, setValidatePatientLastName] = useState(false)
  const [validatePatientDOB, setValidatePatientDOB] = useState(false)
  const [validatePatientEmail, setValidatePatientEmail ] = useState(false)
  const [validatePatientPassword, setValidatePatientPassword ] = useState(false)
  

// Handle Change Functions
  
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

  const handleChangePatient = (e) => {
    let { name, value } = e.target;
    if (name === "doctor_id") {
      value = parseInt(value)
      setPatientFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    else {
       setPatientFormData(prevState => ({
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
   
// Handle Submit Functions

  const handleSubmit = (e) => {
    e.preventDefault()
    if (createPatient) {
      validatePatientForm()
    } else if (createMedication) {
      validateMedicationForm()
    } else {
      setCreateOrder(true)
    }
  }

  const handleSubmitOrder = async () => {
    const created = await putOrder(orderFormData.id, orderFormData);
    setIsCreated(true);
    setEditOrder(false)
    setCurrentOrder(null);
  };

  const handleSubmitPatient = async () => {
    const created = await createNewPatient(patientFormData)
    setMedicationFormData(prevState => ({
      ...prevState,
      patient_id: created.id
    }))
    setOrderFormData(prevState => ({
      ...prevState,
      patient_id: created.id
    }))
    setCreatePatient(false)
    if (createMedication) {
      setSubmitMedication(true)
    } else {
      setCreateOrder(true)
    }
  }

  const handleSubmitMedication = async () => {
    const created = await postMedication(medicationFormData);
    setOrderFormData(prevState => ({
      ...prevState,
      medication_id: created.id
    }))
    setCreateMedication(false)
    setSubmitMedication(false)
    setCreateOrder(true)
  };


// Form Validation Functions
  
  const validateOrderForm = () => {

    setValidateDoctor(false)
    setValidatePatient(false)
    setValidateMedication(false)
    setValidatePharmacyAddress(false)

    if (userCategory === 'doctor') {
     
      if (orderFormData.medication_id === "") {
        setValidateMedication(true)
        alert('Please select a medication')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.patient_id === "") {
        setValidatePatient(true)
        alert('Please select a patient')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.pharmacy_address === "") {
        setValidatePharmacyAddress(true)
        alert('Please include a valid address')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.medication_id !== "" && orderFormData.patient_id !== "" && orderFormData.doctor_id !== "" && orderFormData.pharmacy_address !== "") {
        handleSubmitOrder(orderFormData)
      }
      else {
        setCreateMedication(false)
        setCreateOrder(false)
      }
    }

    else if (userCategory === 'patient') {

      if (orderFormData.medication_id === "" || orderFormData.medication_id === "-- Select Your Medication --") {
        setValidateMedication(true)
        alert('Please select a medication')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.doctor_id === "") {
        setValidateDoctor(true)
        alert('Please select a doctor')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.pharmacy_address === "") {
        setValidatePharmacyAddress(true)
        alert('Please include a valid address')
        setCreateMedication(false)
        setCreateOrder(false)
        return false
      }
      if (orderFormData.medication_id !== "" && orderFormData.patient_id !== "" && orderFormData.doctor_id !== "" && orderFormData.pharmacy_address !== "") {
        handleSubmitOrder(orderFormData)
      }
      else {
        setCreateMedication(false)
        setCreateOrder(false)
      }
    }
  }

  useEffect(() => {
    if (createOrder) {
      validateOrderForm()
    }
  }, [createOrder])

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

  useEffect(() => {
    if (submitMedication) {
      validateMedicationForm()
    }
  }, [submitMedication])

  const validatePatientForm = () => {

    setValidatePatientFirstName(false)
    setValidatePatientLastName(false)
    setValidatePatientDOB(false)
    setValidatePatientEmail(false)
    setValidatePatientLastName(false)

    if (patientFormData.first_name === "") {
      setValidatePatientFirstName(true)
      alert("Please include patient's first name!")
      return false
    }
    if (patientFormData.last_name === "") {
      setValidatePatientLastName(true)
      alert("Please include patient's last name!")
      return false
    }
    if (patientFormData.date_of_birth === "") {
      setValidatePatientDOB(true)
      alert("Please include patient's date of birth!")
      return false
    }
    if (patientFormData.email === "" || !patientFormData.email.includes('@') || !patientFormData.email.includes('.') || patientFormData.email.includes('@.')) {
      setValidatePatientEmail(true)
      alert("Please include patient's email!")
      return false
    }
    if (patientFormData.password === "" || patientFormData.password.length < 8) {
      setValidatePatientPassword(true)
      alert("Please include patient's password!")
      return false
    }
    else {
      handleSubmitPatient(patientFormData)
    }
  }

// Activate Patient/Medication Create Components

  const activatePatientForm = () => {
    setCreatePatient(!createPatient)
  }

  const activateMedicationForm = () => {
    setCreateMedication(!createMedication)
  }

// Redirect Functions

  const returnHome = () => {
    setEditOrder(false);
    setCurrentOrder(null);
    history.push('/home')
  }

  if (isCreated) {
    return <Redirect to={`/home`} />;
  }

  
  return (
    <div className="create-order-container">

      <div className="create-order-form-container">

        <div className="create-order-form-header">

          <i className="fas fa-chevron-left create-form-back-button" onClick={returnHome} />

          <p className="create-order-form-title">Submit An Order</p>

        </div>

        <div className="order-form-container">

          <div className="placeholder-div">

          </div>

          <form className="create-order-form" onSubmit={
            
          (e) => {
            handleSubmit(e)
          }} >

            {(userCategory && userCategory === 'patient') ?
            
              <>

                <label className="create-form-label">
                  Doctor
                  <select className={validateDoctor ? "create-order-form-input invalid" : "create-order-form-input"} defaultValue={'default'} name="doctor_id" onChange={handleChangeOrder}>
                  <option value='default'>-- Select Doctor --</option>
                  {doctors.map(doctor => (
                    <option value={doctor.id} key={doctor.id}>{`${doctor.last_name}, ${doctor.first_name}`}</option>
                  ))}
                  </select>
                </label>

              </>  

            :
    
              <>
              </>
                            
            }             

            {(userCategory && userCategory === 'doctor') ?
              
              <>
                  
                <label className="create-form-label">
                  Patient
                  <select className={validatePatient ? "create-order-form-input invalid" : "create-order-form-input"} value={orderFormData.patient_id} name="patient_id" onChange={handleChangeOrder}>
                    <option value="default">-- Select Patient --</option>
                    {patients.map(patient => (
                      <option value={patient.id} key={patient.id}>{`${patient.last_name}, ${patient.first_name}`}</option>
                    ))}
                  </select>
                </label>

                <label className="create-form-label" id="patient-form-radio">
                    Add New Patient? 
                    <input
                      type="radio"
                      className="radio-input"
                      name="createPatient"
                      onClick={activatePatientForm}
                      defaultChecked={createPatient}
                    />
                  </label>
                  
                <div className="create-patient-form-container">

                  {createPatient ?
                        
                    <PatientCreate patientFormData={patientFormData}
                                   validatePatientFirstName={validatePatientFirstName}
                                   validatePatientLastName={validatePatientLastName}
                                   validatePatientDOB={validatePatientDOB}
                                   validatePatientEmail={validatePatientEmail}
                                   validatePatientPassword={validatePatientPassword}
                                   handleChangePatient={handleChangePatient}
                    />
                  
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

            {(userCategory && userCategory === 'doctor') ?
              
              <>
                
                <label className="create-form-label">
                  Medication
                  <select className={validateMedication ? "create-order-form-input invalid" : "create-order-form-input"} defaultValue={'default'} name="medication_id" onChange={handleChangeOrder}>
                  <option value='default'>-- Select Your Medication --</option>
                  {selectedPatientMedications?.map(medication => (
                    <option value={medication.id} key={medication.id}>{`${medication.name}`}</option>
                  ))}
                  </select>
                </label>
                    
                <div className="create-medication-form-container">

                    <label className="create-form-label" id="medication-form-radio">
                      Add New Medication? 
                      <input
                        type="radio"
                        className="radio-input"
                        name="createMedication"
                        onClick={activateMedicationForm}
                        defaultChecked={createMedication}
                      />
                    </label>

                  { createMedication ?
                      
                      <MedicationCreate medicationFormData={medicationFormData} validateMedicationName={validateMedicationName} validateMedicationDosage={validateMedicationDosage} handleChangeMedication={handleChangeMedication} />
                      
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