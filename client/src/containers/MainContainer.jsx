import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../screens/Home/Home'
import Orders from '../components/Order/Orders'
import OrderCreate from "../components/Order/OrderCreate"
import Search from '../components/Search/Search'


export default function MainContainer(props) {

  const { isCreated, setIsCreated } = props;
  const { currentUser, userCategory } = props;
  const { doctors, setDoctors } = props;
  const { patients, setPatients } = props;
  const { medications, setMedications } = props;
  const { setOrders } = props;
  const { queriedOrders } = props;
  const { searchQuery} = props;
  const { handleSearch } = props;

  useEffect(() => {
    const user = userCategory

    if (user === 'doctor') {
      const patientSTRING = localStorage.getItem('patients');
      const patientJSON = JSON.parse(patientSTRING)
      setPatients(patientJSON);
      const orderSTRING = localStorage.getItem('orders');
      const orderJSON = JSON.parse(orderSTRING)
      setOrders(orderJSON);
    }
    else if (user === 'patient') {
      const medicationInfo = localStorage.getItem('medications')
      setMedications(medicationInfo)
      const orderInfo = localStorage.getItem('orders');
      setOrders(orderInfo);
    }

  }, [userCategory])


  return (
    <>
      
      { ((currentUser)) ?

        < Switch >
        
          <Route exact path="/home">
            
            <Home currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={queriedOrders} handleSearch={handleSearch} searchQuery={searchQuery} />
          </Route>
            
          <Route path="/orders">
            
            <Orders orders={queriedOrders} />
          </Route>

          <Route path="/order-create">
            <OrderCreate currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} isCreated={isCreated} setIsCreated={setIsCreated} handleSearch={handleSearch} searchQuery={searchQuery} />
          </Route>

        </Switch>

      :

        <>
          
        </>
      }
    </>

  )

}