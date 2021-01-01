import React from 'react'

import "../Order/OrderCards.css"

export default function OrderCard(props) {
  
  const { order } = props

  return (
    <div className="order-card-container">
      
      <p className="order-date-copy">{order.date}</p>

      <p className="doctor-copy">{order.doctor_id}</p>

      <p className="medication-copy">{order.medication_id}</p>

      <p className="pharmacy-copy">{order.pharmacy_address}</p>

      <p className="order-status-copy">{order.filled}</p>

    </div>
  )
}