import React from 'react'

import '../Order/Orders.css'

import OrderCard from '../Order/OrderCard.css'

export default function Orders(props) {

  const { orders } = props

  const ORDERS = orders.map((order, index) => {

    <OrderCard
      order={order}
      index={index}
    />

  })
  
  return (
    <div className="orders-container">
      { ORDERS }
    </div>
  )
}