import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CheckoutForm from './CheckoutForm';

const Cart = props => {
  const dispatch = useDispatch();
  const stateTotalAmount = useSelector(state => state.cart.totalAmount)
  const stateItems = useSelector(state => state.cart.items)
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totalAmount = `$${stateTotalAmount.toFixed(2)}`;
  const hasItems = stateItems.length > 0;

  const cartItemRemoveHandler = id => {
    dispatch(cartActions.removeFromCart(id))
  };

  const cartItemAddHandler = item => {
    dispatch(cartActions.addToCart(item))
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitDataHandler = async data => {
    setIsLoading(true);
    await fetch(
      'https://react-http-597d3-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          userData: data,
          orderData: stateItems,
        }),
      }
    );
    setIsLoading(false);
    setOrderComplete(true);
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {stateItems.map(item => (
        <CartItem
          key={item.id}
          title={item.title}
          quantity={item.quantity}
          price={item.price}
          totalPrice={item.totalPrice}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalButton = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onConfirm={submitDataHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalButton}
    </React.Fragment>
  );

  const loadingModal = <p>Order Sending...</p>

  const orderCompleteModal = <React.Fragment>
    <p>Order Complete!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>

  return <Modal onClose={props.onClose}>
    {!isLoading && !orderComplete && cartModal}
    {isLoading && loadingModal}
    {orderComplete && !isLoading && orderCompleteModal}
  </Modal>;
};

export default Cart;
