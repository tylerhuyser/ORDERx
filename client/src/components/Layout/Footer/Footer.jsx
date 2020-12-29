import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer () {

    return (
      <div className="footer-container slide-in-bottom-nav">

        <Link to="/home">
          <i class="fas fa-home mobile-footer-icon"></i>
        </Link>

        <Link to="/create-order">
          <i class="fas fa-pills mobile-footer-icon"></i>
        </Link>

        <Link to="/past-orders">
          <i class="fas fa-clock mobile-footer-icon"></i>
        </Link>

      </div>
    )
}