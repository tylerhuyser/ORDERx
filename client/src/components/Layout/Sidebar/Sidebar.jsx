import React from 'react'
import { Link } from 'react-router-dom';

import '../Sidebar/Sidebar.css'

export default function Sidebar() {
  

  return (
    <div className="sidebar-container">

      <Link to="/home">
        <i className="fas fa-home sidebar-icon"></i>
      </Link>
      
      <Link to="/create-order">
        <i className="fas fa-pills sidebar-icon"></i>
      </Link>

      <Link to="/past-orders">
        <i className="fas fa-clock sidebar-icon"></i>
      </Link>

    </div>
  )  
}