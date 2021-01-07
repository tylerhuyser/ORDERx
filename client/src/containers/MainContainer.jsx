import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import Home from '../screens/Home/Home'
import Orders from '../components/Order/Orders'
import OrderCreate from "../components/Order/OrderCreate"
import OrderEdit from "../components/Order/OrderEdit"

import {
  destroyOrder
} from '../services/orders'


export default function MainContainer(props) {

  const [ currentOrder, setCurrentOrder ] = useState(null)
  const [ editOrder, setEditOrder ] = useState(false)

  const { isCreated, setIsCreated } = props;
  const { currentUser, userCategory } = props;
  const { doctors, setDoctors } = props;
  const { patients, setPatients } = props;
  const { medications, setMedications } = props;
  const { setOrders } = props;
  const { queriedOrders } = props;
  const { searchQuery} = props;
  const { handleSearch } = props;
  const { isDeleted, setIsDeleted } = props;
  const history = useHistory()

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

  const deleteOrder = async (id) => {
    await destroyOrder(id)
    setIsDeleted(!isDeleted)
  }

  const handleEdit = (e) => {
    setCurrentOrder(e)
    setEditOrder(true)
  }

  useEffect(() => {
    if(editOrder) {
      history.push('/order-edit')
    }
  }, [editOrder])

  return (
    <>
      
      { ((currentUser)) ?

        < Switch >
        
          <Route exact path="/home">
            
            <Home currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} orders={queriedOrders} handleSearch={handleSearch} searchQuery={searchQuery} completeOrderList={props.completeOrderList} deleteOrder={deleteOrder} handleEdit={handleEdit} />
          </Route>
            
          <Route path="/orders">
            
            <Orders orders={props.orders} userCategory={userCategory} deleteOrder={deleteOrder} handleEdit={handleEdit} />

          </Route>

          <Route path="/order-create">
            <OrderCreate currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} isCreated={isCreated} setIsCreated={setIsCreated} handleSearch={handleSearch} searchQuery={searchQuery} />
          </Route>

          <Route path="/order-edit">
            <OrderEdit currentUser={currentUser} userCategory={userCategory} doctors={doctors} patients={patients} medications={medications} isCreated={isCreated} setIsCreated={setIsCreated} handleSearch={handleSearch} searchQuery={searchQuery} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} setEditOrder={setEditOrder} />
          </Route>

        </Switch>

      :

        <>
          
        </>
      }
    </>

  )

}