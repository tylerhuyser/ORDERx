import React, { useState, useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import "./App.css";

import Layout from "../src/components/Layout/Layout";
import LoginRouter from "../src/screens/Login/LoginRouter";
import MainContainer from "../src/containers/MainContainer"

import {
  loginDoctor,
  registerDoctor,
  removeToken,
  verifyUser,
} from "./services/auth";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
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

  const handleLogin = async (loginData) => {
    const employeeData = await loginDoctor(loginData);
    if (employeeData.error) {
      setError(employeeData.error)
    } else {
      setCurrentUser(employeeData);
      history.push("/home");
    }
  };

  const handleRegister = async (registerData) => {
    const employeeData = await registerDoctor(registerData);
    if (employeeData.error) {
      setError(employeeData.error)
    } else {
      setCurrentUser(employeeData);
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
        
      <Route exact path="/">
        <LoginRouter handleLogin={handleLogin} handleRegister={handleRegister} />
      </Route>
        
        :

        <Layout currentUser={currentUser} handleLogout={handleLogout}>
          <MainContainer />
        </Layout>
      }

    </div>
  );
}

export default App;
