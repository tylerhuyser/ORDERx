import React from 'react'
import { Link } from 'react-router-dom';

import '../Sidebar/Sidebar.css'

export default function Sidebar() {
  

  return (
    <div className="sidebar-container">

      <Link to="/home">
        <i class="fas fa-home sidebar-icon"></i>
      </Link>
      
      <Link to="/create-order">
        <i class="fas fa-pills sidebar-icon"></i>
      </Link>

      <Link to="/past-orders">
        <i class="fas fa-clock sidebar-icon"></i>
      </Link>

    </div>
  )  
}