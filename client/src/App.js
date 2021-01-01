import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

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
  getAllPatients,
  getOnePatient,
  getAllDoctors,
  getOneDoctor,
} from "./services/users";


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [userCategory, setUserCategory] = useState(false);
  
  const [doctors, setDoctors ] = useState(null)
  const [ patients, setPatients ] = useState(null)
  const [ medications, setMedications ] = useState(null);
  const [ orders, setOrders ] = useState(null);

  const [error, setError] = useState(null)
  const history = useHistory();

  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
      if (userData === null) {
        history.push("/");
      }
    };
    handleVerify();
  }, []);
  
  useEffect(() => {
    if ((currentUser) && (userCategory)) {
      const userID = currentUser.id

      const getUserData = async (userID) => {
        if (userCategory === "doctor") {
          const doctorData = await getOneDoctor(userID)
          const patientInfo = doctorData.patients
          const orderInfo = doctorData.orders
          setPatients(patientInfo)
          setOrders(orderInfo)
        } else if (userCategory === "patient") {
          const patientData = await getOnePatient(userID)
          const medicationInfo = patientData.medications
          const orderInfo = patientData.orders
          setMedications(medicationInfo)
          setOrders(orderInfo)
        }
      };
      getUserData(userID)
    }
  }, [currentUser])

    // Functions

  // Login Functions

  const handleDoctorLogin = async (loginData) => {
    const doctorData = await loginDoctor(loginData);
    if (doctorData.error) {
      setError(doctorData.error)
    } else {
      setCurrentUser(doctorData);
      history.push("/home");
    }
  };

  const handleDoctorRegister = async (registerData) => {
    const doctorData = await registerDoctor(registerData);
    if (doctorData.error) {
      setError(doctorData.error)
    } else {
      setCurrentUser(doctorData);
      history.push("/home");
    }
  };

  const handlePatientLogin = async (loginData) => {
    const patientData = await loginPatient(loginData);
    if (patientData.error) {
      setError(patientData.error)
    } else {
      setCurrentUser(patientData);
      history.push("/home");
    }
  };

  const handlePatientRegister = async (registerData) => {
    const patientData = await registerPatient(registerData);
    if (patientData.error) {
      setError(patientData.error)
    } else {
      setCurrentUser(patientData);
      history.push("/home");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    removeToken();
    history.push("/login");
  };

  return (

    <div className="app-container">

      { !currentUser ?
        
        <Switch>

          <Layout currentUser={currentUser} handleLogout={handleLogout}>
            <LoginContainer userCategory={userCategory} setUserCategory={setUserCategory} handleDoctorLogin={handleDoctorLogin} handleDoctorRegister={handleDoctorRegister} handlePatientLogin={handlePatientLogin} handlePatientRegister={handlePatientRegister} />
          </Layout>

        </Switch>
        

        :

        <Layout currentUser={currentUser} handleLogout={handleLogout}>
          <MainContainer currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={orders} />
        </Layout>
      }

    </div>
  );
}

export default App;