import React, {useEffect} from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../screens/Home/Home'
import Orders from '../components/Order/Orders'


export default function MainContainer(props) {

  const { currentUser, userCategory } = props
  const { doctors, setDoctors } = props
  const { patients, setPatients } = props
  const { medications, setMedications } = props
  const { orders, setOrders } = props

  useEffect(() => {
    const user = userCategory
    console.log(user)

    if (user === 'doctor') {
      console.log("kkkjj")
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
  
  console.log("main cont")

  return (
    <>
      
      { ((currentUser) && (orders.length !== 0)) ?

        < Switch >
        
          <Route exact path="/home">
            <Home currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={orders} />
          </Route>
            
          <Route path="/orders">
              <Orders orders={orders} />
          </Route>

        </Switch>

      :

        <>
          
        </>
      }
    </>

  )

}