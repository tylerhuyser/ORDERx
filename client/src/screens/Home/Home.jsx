import React, { useState, useEffect } from "react";

import Orders from '../../components/Order/Orders'

import '../Home/Home.css'

export default function Home (props) {

  const { currentUser, userCategory, doctors, patients, medications, orders } = props

  const [unfilledOrders, setUnfilledOrders] = useState(null)

  useEffect(() => {
    if (orders) {
      const gatherUnfilledOrders = (orders) => {
        const unFilledOrdersList = orders.filter((order) => order.filled === false)
        setUnfilledOrders(unFilledOrdersList)
      }
      gatherUnfilledOrders(orders);
    }
  }, [orders])

  console.log(orders)
  console.log(unfilledOrders)
  // console.log(unfilledOrders.length)

  return (
    <div className="home-container">

      { unfilledOrders && unfilledOrders.length !== 0 ?
        
        <div className="unfilled-orders-container">

          <p className="unfilled-orders-copy">{`You currently have ${unfilledOrders.length} unfilled orders`}</p>
        
          <Orders orders={unfilledOrders} />
          
        </div>
        
      :
        
        <div className="unfilled-orders-container">
          <p className="unfilled-orders-copy">You currently have 0 unfilled orders.</p>
        </div>
        
      }

    </div>
  )
}