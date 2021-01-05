import React, {useState, useEffect} from 'react'

import "../Order/OrderCard.css"

import {
  getOneMedication
} from '../../services/medications'

import {
  getOneDoctor
} from '../../services/users'

import {
  getOnePatient
} from '../../services/users'

export default function OrderCard(props) {

  const [currentMedication, setCurrentMedication] = useState({})
  const [currentDoctor, setCurrentDoctor] = useState({})
  const [ currentPatient, setCurrentPatient] = useState({})
  
  const { order, userCategory } = props

  useEffect(() => {
    if (order) {
      if (userCategory === "doctor") {
        const getPatientData = async (patient_id) => {
          const patientData = await getOnePatient(patient_id);
          setCurrentPatient(patientData)
        }
        const getMedicationData = async (medication_id) => {
          const medicationData = await getOneMedication(medication_id)
          setCurrentMedication(medicationData)
        }
        getPatientData(order.patient_id)
        getMedicationData(order.medication_id)
      }
      if (userCategory === "patient") {
        const getDoctorData = async (doctor_id) => {
          const doctorData = await getOneDoctor(doctor_id);
          setCurrentDoctor(doctorData)
        }
        const getMedicationData = async (medication_id) => {
          const medicationData = await getOneMedication(medication_id)
          setCurrentMedication(medicationData)
        }
        getDoctorData(order.doctor_id)
        getMedicationData(order.medication_id)
      }
    }
  }, [order])

  return (
    <div className="order-card-container" key={order.id} id={order.id} >

      <div className="order-card-title">

        <p className="medication-copy">{currentMedication.name}</p>
      
        <p className="order-date-copy">{order.date}</p>
        
      </div>

      <div className="order-card-content">

        {userCategory === "doctor" ?

          <p className="doctor-copy">{`${currentPatient.first_name} ${currentPatient.last_name}`}</p>

        :
        
          <p className="doctor-copy">{`Dr. ${currentDoctor.first_name} ${currentDoctor.last_name}`}</p>

        }
          
        <p className="pharmacy-copy">{order.pharmacy_address}</p>
        
      </div>

      {order.filled ?
        
        <div className="order-status-container" id="filled-order-container">
          
          <p className="order-status-copy" id="filled-order-copy">Filled</p>
        
        </div>

          :
        
        <div className="order-status-container" id="pending-order-container">

          <p className="order-status-copy" id="pending-order-copy">Pending</p>

        </div>
        
        }

    </div>
  )
}