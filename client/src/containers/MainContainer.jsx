import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../screens/Home/Home'


export default function MainContainer(props) {

  const { currentUser, userCategory, doctors, patients, medications, orders } = props
  

  return (
    <>
      
      { currentUser ?

        < Switch >
        
        <Route exact path="/home">
          <Home currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={orders} />
        </Route>

      </Switch>

      :

        <>
          
        </>
      }
    </>

  )

}