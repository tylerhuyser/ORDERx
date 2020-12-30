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

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [ userCategory, setUserCategory ] = useState(false);
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

        <Layout currentUser={currentUser} handleLogout={handleLogout} userCategory={userCategory}>
          <MainContainer />
        </Layout>
      }

    </div>
  );
}

export default App;