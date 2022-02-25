import React from 'react'
import Card from '../../UI/Card'
import classes from './UserOrder.module.css'
import UserOrderItem from './UserOrderItem'

function UserOrder(props) {
  
  return (
    <section className={classes.orders}>
      <Card>
        <p><span>Name: </span>{props.name}</p> 
        <p><span>Email: </span>{props.email}</p> 
        <p><span>Phone: </span>{props.phone}</p> 
        <p><span>Street: </span>{props.street}</p> 
        <p><span>City: </span>{props.city}</p> 
        <p><span>Postal: </span>{props.postal}</p> 
        <p><span>OrderID: </span>{props.id}</p> 
        <UserOrderItem items={props.items} />
      </Card>
    </section>
  )
}

export default UserOrder