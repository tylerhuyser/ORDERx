import React, { useState, useEffect } from "react";

import Search from '../../components/Search/Search'
import Orders from '../../components/Order/Orders'

import '../Home/Home.css'

export default function Home (props) {

  const { orders } = props
  const { searchQuery} = props;
  const { handleSearch } = props;
  const { completeOrderList } = props;
  const { userCategory } = props;
  const { handleEdit, deleteOrder } = props;

  const [unfilledOrders, setUnfilledOrders] = useState(null)

  useEffect(() => {
    if (completeOrderList.length !== 0) {
      const gatherUnfilledOrders = (completeOrderList) => {
        const unfilledOrdersList = completeOrderList?.filter((order) => order.filled === false)
        setUnfilledOrders(unfilledOrdersList)
      }
      gatherUnfilledOrders(completeOrderList);
    }
  }, [completeOrderList])

  return (
    <div className="home-container">

      <Search handleSearch={handleSearch} searchQuery={searchQuery} />

      { ((unfilledOrders) && (unfilledOrders.length !== 0)) ?
        
        <div className="unfilled-orders-container">

          {searchQuery === "" ?

            < p className="unfilled-orders-copy">You currently have <span className="unfilled-orders-total">{unfilledOrders.length}</span> unfilled order(s).</p>
        
          :

            <>
            </>
          }
        
          <Orders orders={searchQuery !== "" ? orders : unfilledOrders} userCategory={userCategory} deleteOrder={deleteOrder} handleEdit={handleEdit} />
          
        </div>
        
      :
        
        <div className="unfilled-orders-container">
          <p className="unfilled-orders-copy">You currently have <span className="unfilled-orders-total">0</span> unfilled orders.</p>
        </div>
        
      }

    </div>
  )
}