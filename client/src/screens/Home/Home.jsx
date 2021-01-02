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

      { ( (unfilledOrders) && (unfilledOrders.length !== 0) ) ?
        
        <div className="unfilled-orders-container">

          <p className="unfilled-orders-copy">You currently have <span className="unfilled-orders-total">{unfilledOrders.length}</span> unfilled orders</p>
        
          <Orders orders={unfilledOrders} />
          
        </div>
        
      :
        
        <div className="unfilled-orders-container">
          <p className="unfilled-orders-copy">You currently have <span className="unfilled-orders-total">0</span> unfilled orders.</p>
        </div>
        
      }

    </div>
  )
}