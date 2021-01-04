import React, { useState, useEffect } from "react";

import Search from '../../components/Search/Search'
import Orders from '../../components/Order/Orders'

import '../Home/Home.css'

export default function Home (props) {

  const { orders } = props
  const { searchQuery} = props;
  const { handleSearch } = props;

  const [unfilledOrders, setUnfilledOrders] = useState(null)

  useEffect(() => {
    if (orders.length !== 0) {
      const gatherUnfilledOrders = (orders) => {
        const unfilledOrdersList = orders?.filter((order) => order.filled === false)
        setUnfilledOrders(unfilledOrdersList)
      }
      gatherUnfilledOrders(orders);
    }
  }, [orders])

  return (
    <div className="home-container">

      <Search handleSearch={handleSearch} searchQuery={searchQuery} />

      { ( (unfilledOrders) && (unfilledOrders.length !== 0) ) ?
        
        <div className="unfilled-orders-container">

          <p className="unfilled-orders-copy">You currently have <span className="unfilled-orders-total">{unfilledOrders.length}</span> unfilled order(s).</p>
        
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