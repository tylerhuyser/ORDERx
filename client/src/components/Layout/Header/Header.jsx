import React from 'react';

import './Header.css'

export default function Header(props) {
  
  const { handleLogout } = props;

  return (
    <div className="header-container slide-in-top-header"> 
      <i className="far fa-user-circle" onClick={handleLogout}></i>
      <img alt="wims-logo" src="https://i.imgur.com/ioUfIYI.png" width="60vw" />
      <i className="fas fa-bars"></i>
    </div>
  )
}