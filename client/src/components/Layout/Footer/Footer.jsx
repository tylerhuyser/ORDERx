import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'

export default function Footer () {

    return (
      <div className="footer-container slide-in-bottom-nav">

        <Link to="/home">
          <i className="fas fa-home mobile-footer-icon"></i>
        </Link>

        <Link to="/order-create">
          <i className="fas fa-pills mobile-footer-icon"></i>
        </Link>

        <Link to="/orders">
          <i className="fas fa-clock mobile-footer-icon"></i>
        </Link>

      </div>
    )
}