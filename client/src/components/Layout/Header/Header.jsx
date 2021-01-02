import React, { useState } from 'react';

import './Header.css'

export default function Header(props) {

  const [menuVisibility, setMenuVisibility] = useState(false);

  const changeMenuVisibility = (e) => {
    e.preventDefault();
    setMenuVisibility(!menuVisibility);
  };
  
  const { currentUser, handleLogout } = props;

  return (

    <div className="header-container slide-in-top-header"> 

      <div className="desktop-nav">

        <div className="desktop-logo-container">

          <img className="desktop-logo" id="logo-copy" alt="logo-copy" src="https://i.imgur.com/96N7jFM.png" />
          
        </div>

        {currentUser ? 

          <div className="desktop-logo-symbol-container">

            <img className="logo" id="logo-symbol" atl="logo-symbol" src="https://i.imgur.com/2Bu6x5X.png" />

          </div>
          
          :

          <>
          </>
          
        }

        <div className="desktop-nav-links-container">

          <p className="desktop-nav-link">About</p>

          <p className="desktop-nav-link">Blog</p>

          {currentUser ?
            
            <p className="desktop-nav-link" id="current-user-name" onClick={handleLogout}>{currentUser.last_name}, {currentUser.first_name}</p>

            :
          
            <p className="desktop-nav-link" id="login-link">Login</p>

          }
        </div>

      </div>

      <div className="mobile-nav">

        {menuVisibility ?
        
        <i className="fas fa-times mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
          
        :

        <i className="fas fa-bars mobile-icon" onClick={(e) => changeMenuVisibility(e)}></i>
      
        }

        <div className="mobile-logo-container">

          <img className="mobile-logo" id="symbol-only white" alt="symbol-only white" src="https://i.imgur.com/XRY6jqr.png" />

        </div>

        {currentUser ?
        
        <i className="far fa-user-circle mobile-icon" onClick={handleLogout}></i> 
          
        :
          
        <div className="mobile-header-placeholder"></div>
          
        } 

      </div>

      <div id="mobile-menu" className={menuVisibility ? "mobile-menu-visible" : "mobile-menu-hidden"}>
      
        <p className="mobile-nav-link">About</p>
        <p className="mobile-nav-link">Blog</p>

      </div>
      
    </div>
  )
}