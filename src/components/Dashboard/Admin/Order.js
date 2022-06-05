import classes from './Order.module.css';
import React from 'react';
import { useState } from 'react';

const Order = props => {
  const cartItems = props.items;
  const [showItems, setShowItems] = useState(false);

  let totalPrice = 0;
  let totalQuantity = 0;

  for (const key in cartItems) {
    totalPrice += cartItems[key].itemPrice * cartItems[key].itemQuantity;
    totalQuantity += cartItems[key].itemQuantity;
  }

  const showItemsHandler = () => {
    if (showItems) {
      setShowItems(false);
    } else {
      setShowItems(true);
    }
  };

  const itemsRow = cartItems.map(cartItem => (
    <tr key={cartItem.itemId}>
      <td data-label="Item ID">{cartItem.itemId}</td>
      <td data-label="Title">{cartItem.itemName}</td>
      <td data-label="Price">{cartItem.itemPrice}</td>
      <td data-label="Quantity">{cartItem.itemQuantity}</td>
      <td data-label="Total Price">{cartItem.itemPrice * cartItem.itemQuantity}</td>
    </tr>
  ));

  return (
    <React.Fragment>
      <li className={classes.order}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.address}>{props.city}</div>
          <h4>
            Total Quantity: <span>{totalQuantity}</span>
          </h4>
        </div>
        <div>
          <div className={classes.price}>৳{totalPrice.toFixed(0)}</div>
          <button onClick={showItemsHandler}>{showItems ? 'Hide' : 'Show'} Items</button>
        </div>
      </li>
      {showItems && (
        <div>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>{itemsRow}</tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default Order;
