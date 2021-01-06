import React from 'react'

import './Orders.css'

import OrderCard from './OrderCard'

export default function Orders (props) {

  const { orders } = props
  const { searchQuery} = props;
  const { handleSearch } = props;
  const { userCategory } = props;
  const { deleteOrder } = props;

  const ORDERSjsx = orders?.map((order, index) => (

    <OrderCard
      order={order}
      index={index}
      key={order.id}
      userCategory={userCategory}
      deleteOrder={deleteOrder}
    />

  ))
  
  return (
    <div className="orders-container">
      { ORDERSjsx }
    </div>
  )
}