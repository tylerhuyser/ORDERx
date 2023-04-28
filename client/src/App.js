import React, { useState, useEffect } from "react";
import { useHistory, Switch } from "react-router-dom";

import "./App.css";

import Layout from "../src/components/Layout/Layout";
import LoginContainer from "../src/screens/Login/LoginContainer";
import MainContainer from "../src/containers/MainContainer"

import {
  loginDoctor,
  registerDoctor,
  loginPatient,
  registerPatient,
  removeToken,
  verifyUser,
} from "./services/auth";

import {
  getOnePatient,
  getOneDoctor,
} from "./services/users";


function App() {

  const [ currentUser, setCurrentUser ] = useState(null);
  const [ userCategory, setUserCategory ] = useState("");
  const [ searchQuery, setSearchQuery ] = useState("")
  
  const [ doctors, setDoctors ] = useState([])
  const [ patients, setPatients ] = useState([])
  const [ medications, setMedications ] = useState([]);
  const [ orders, setOrders ] = useState([]);
  const [ queriedOrders, setQueriedOrders ] = useState([])

  const [isCreated, setIsCreated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const history = useHistory();

  useEffect(() => {

    console.log('UseEffect #1 - Auth/Verify User')

    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
      if (userData === null) {
        history.push("/");
      }
      else if ('doctor_id' in userData) {

        console.log('UseEffect #1 - PATIENT Verified')

        setUserCategory('patient')
        localStorage.setItem('userCategory', 'patient')
      } else {

        console.log('UseEffect #1 - DOCTOR Verified')

        setUserCategory('doctor')
        localStorage.setItem('userCategory', 'doctor')
      }
    };
    handleVerify();
  }, []);

  useEffect(() => {

    console.log('UseEffect #2')

    if (currentUser && currentUser !== null && userCategory !== "" && (userCategory === "doctor" || userCategory === "patient")) {

      const stringifiedPatientData = localStorage.getItem('patients');
      const stringifiedDoctorData = localStorage.getItem('doctors');
      const stringifiedOrderData = localStorage.getItem('orders');
      const stringifiedMedicationData = localStorage.getItem('medications');

      if (userCategory === "doctor" && stringifiedPatientData && stringifiedOrderData && stringifiedMedicationData) {

        console.log('UseEffect #2 - LocalStorage - DOCTOR info')

        setPatients(JSON.parse(stringifiedPatientData))
        setOrders(JSON.parse(stringifiedOrderData))
        setMedications(JSON.parse(stringifiedMedicationData))
  
      } else if (userCategory === "patient" && stringifiedDoctorData && stringifiedOrderData && stringifiedMedicationData) {

        console.log('UseEffect #2 - LocalStorage - PATIENT info')
  
        setDoctors(JSON.parse(stringifiedDoctorData))
        setOrders(JSON.parse(stringifiedOrderData))
        setMedications(JSON.parse(stringifiedMedicationData))
   
      } else {

        getUserDataFromAPI(currentUser, userCategory)

      }

    }
  }, [currentUser, userCategory])

  useEffect(() => {
    if (currentUser && userCategory && (isCreated === true || isDeleted === true)) {
      console.log('Useffecrt #3 - Gathering from API due to OrderCreate, OrderEdit, or OrderDelete')
      getUserDataFromAPI(currentUser, userCategory)
    }
  }, [isCreated, isDeleted])
  

// Functions

  // Login Functions

  const handleDoctorLogin = async (loginData) => {
    const doctorData = await loginDoctor(loginData);
    if (doctorData.error) {
      return
    } else {
      localStorage.setItem('userCategory', 'doctor')
      setUserCategory('doctor')
      setCurrentUser(doctorData);
      history.push("/home");
    }
  };

  const handleDoctorRegister = async (registerData) => {
    const doctorData = await registerDoctor(registerData);
    if (doctorData.error) {
      return
    } else {
      localStorage.setItem('userCategory', 'doctor')
      setUserCategory('doctor')
      setCurrentUser(doctorData);
      history.push("/home");
    }
  };

  const handlePatientLogin = async (loginData) => {
    const patientData = await loginPatient(loginData);
    if (patientData.error) {
      return
    } else {
      localStorage.setItem('userCategory', 'patient')
      setUserCategory('patient')
      setCurrentUser(patientData);
      setIsCreated(!isCreated)
      history.push("/home");
    }
  };

  const handlePatientRegister = async (registerData) => {
    const patientData = await registerPatient(registerData);
    if (patientData.error) {
      return
    } else {
      localStorage.setItem('userCategory', 'patient')
      setUserCategory('patient')
      setCurrentUser(patientData);
      setIsCreated(!isCreated)
      history.push("/home");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userCategory");
    localStorage.removeItem('doctors');
    localStorage.removeItem('patients');
    localStorage.removeItem('orders');
    localStorage.removeItem('medications')
    removeToken();
    setSearchQuery("")
    setUserCategory(false)
    history.push("/");
  };

  // API CALL

  async function getUserDataFromAPI(currentUser, userCategory) {
    if (currentUser && userCategory === "doctor") {

      console.log('UseEffect #2 - API Call - DOCTOR')

      const doctorData = await getOneDoctor(currentUser.id)

      const patientInfo = doctorData.patients
      setPatients(patientInfo)

      const orderInfo = doctorData.orders
      setOrders(orderInfo)
      setQueriedOrders(orderInfo)

      const medicationsData = []
      patientInfo.map((patient) => (patient.medications.map((medication) => (medicationsData.push(medication)))))
      setMedications(medicationsData)

      localStorage.setItem('patients', JSON.stringify(patientInfo))
      localStorage.setItem('orders', JSON.stringify(orderInfo))
      localStorage.setItem('medications', JSON.stringify(medicationsData))

      setIsCreated(false)
      setIsDeleted(false)
      
    } else if (currentUser && userCategory === "patient") {

      console.log('UseEffect #2 - API Call - PATIENT')

      const patientData = await getOnePatient(currentUser.id)

      const medicationInfo = patientData.medications
      setMedications(medicationInfo)

      const orderInfo = patientData.orders
      setOrders(orderInfo)
      setQueriedOrders(orderInfo)

      const doctorsData = []
      orderInfo.map((order) => (
        doctorsData.push(order.doctor)
      ))
      setDoctors(doctorsData)

      localStorage.setItem('medications', JSON.stringify(medicationInfo))
      localStorage.setItem('orders', JSON.stringify(orderInfo))
      localStorage.setItem('doctors', JSON.stringify(doctorsData))
      
      setIsCreated(false)
      setIsDeleted(false)
    }
  }

// Search Function
  
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
    setQueriedOrders([])
    if (e.target.value.length > 2) {

      setQueriedOrders([])

      if (userCategory === 'doctor') {

        const filteredPatients = patients.filter((patient) => (patient.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || patient.last_name.toLowerCase().includes(e.target.value.toLowerCase())))
        const filteredMedications = medications.filter((medication) => (medication.name.toLowerCase().includes(e.target.value.toLowerCase())))
        const newQueriedOrders = orders.filter((order) => ((order.pharmacy_address.toLowerCase().includes(e.target.value.toLowerCase())) || (order.date.toLowerCase().includes(e.target.value.toLowerCase())) || (filteredMedications.some(medication => (medication.id === order.medication_id))) || (filteredPatients.some(patient => (patient.id === order.patient_id)))))

        setQueriedOrders(newQueriedOrders)

      } else if (userCategory === 'patient') {

        const filteredDoctors = doctors.filter((doctor) => (doctor.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || doctor.last_name.toLowerCase().includes(e.target.value.toLowerCase())))
        const filteredMedications = medications.filter((medication) => (medication.name.toLowerCase().includes(e.target.value.toLowerCase())))
        const newQueriedOrders = orders.filter((order) => ((order.pharmacy_address.toLowerCase().includes(e.target.value.toLowerCase())) || (order.date.toLowerCase().includes(e.target.value.toLowerCase())) || (filteredMedications.some(medication => (medication.id === order.medication_id))) || (filteredDoctors.some(doctor => (doctor.id === order.doctor_id)))))

        setQueriedOrders(newQueriedOrders)
      }
    }
  }
 

  return (

    <div className="app-container">

      { !currentUser ?
        
        <Switch>

          <Layout currentUser={currentUser} handleLogout={handleLogout}>
            <LoginContainer currentUser={currentUser} userCategory={userCategory} setUserCategory={setUserCategory} handleDoctorLogin={handleDoctorLogin} handleDoctorRegister={handleDoctorRegister} handlePatientLogin={handlePatientLogin} handlePatientRegister={handlePatientRegister} isCreated={isCreated} setIsCreated={setIsCreated} />
          </Layout>

        </Switch>
        

        :

        <Layout currentUser={currentUser} handleLogout={handleLogout}>
          <MainContainer currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={orders} queriedOrders={queriedOrders} searchQuery={searchQuery} isCreated={isCreated} setIsCreated={setIsCreated} handleSearch={handleSearch} completeOrderList={orders} isDeleted={isDeleted} setIsDeleted={setIsDeleted} />
        </Layout>
      }

    </div>
  );
}

export default App;