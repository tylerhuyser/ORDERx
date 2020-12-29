import React from 'react'
import Header from '../Layout/Header/Header'
import Sidebar from '../Layout/Sidebar/Sidebar'
import Footer from '../Layout/Footer/Footer'

import './Layout.css'

export default function Layout (props) {
  
  const { currentUser, handleLogout } = props;

  return (
    <div className="layout-container">

      <Header
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      <div className="body-container">

        {currentUser ?
          
          <Sidebar />
          :
          <> </>
        }

        {props.children}
      </div>

      <Footer />
    </div>
  )
}