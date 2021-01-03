import React from 'react'

import './Orders.css'

import OrderCard from './OrderCard'

export default function Orders (props) {

  const { orders } = props

  const ORDERSjsx = orders?.map((order, index) => (

    <OrderCard
      order={order}
      index={index}
      key={order.id}
    />

  ))
  
  return (
    <div className="orders-container">
      { ORDERSjsx }
    </div>
  )
}