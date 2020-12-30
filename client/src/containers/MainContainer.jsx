import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../screens/Home/Home'


export default function MainContainer (props) {

  const { currentUser, userCategory } = props 
  const { handleLogout } = props 
  

  return (
    <>
      <Switch>

        <Route exact path="/home">
          <Home currentUser={currentUser} userCategory={userCategory} />
        </Route>

      </Switch>
    </>

  )

}