import classes from './Order.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

const Order = (props) => {
    const dispatch = useDispatch();
    const cartItems = props.items;

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const key in cartItems) {
      totalPrice += (cartItems[key].itemPrice * cartItems[key].itemAmount);
      totalQuantity += cartItems[key].itemAmount;
      dispatch(authActions.calculateTotalOrders(totalPrice));
      dispatch(authActions.calculateTotalOrderedAmount(totalQuantity));
    }

   
    return <li className={classes.order}>
    <div>
      <h3>{props.name}</h3>
      <div className={classes.address}>{props.street}</div>
      <h4>Total Quantity: <span>{totalQuantity}</span></h4>
    </div>
    <div>
      <div className={classes.price}>${totalPrice.toFixed(2)}</div>
      <button>Items</button>
    </div>
  </li>
}

<<<<<<< HEAD:src/components/Dashboard/Order.js
export default Order;
=======
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
>>>>>>> Development:src/components/Dashboard/Admin/Order.js
