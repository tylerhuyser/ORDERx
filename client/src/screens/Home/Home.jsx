import React, { useState, useEffect } from "react";

import {
  getAllPatients,
  getOnePatient,
  getAllDoctors,
  getOneDoctor,
} from "../../services/users";

export default function Home (props) {

  const { currentUser, userCategory } = props

  console.log(currentUser)



  return (
    <div className="home-container">

      <p>HERE!</p>

    </div>
  )
}