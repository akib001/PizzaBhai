import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CheckoutForm from './CheckoutForm';
import { uiActions } from '../../store/ui-slice';

const Cart = props => {
  const dispatch = useDispatch();
  const stateTotalAmount = useSelector(state => state.cart.totalAmount)
  const stateTotalQuantity = useSelector(state => state.cart.totalQuantity)
  const stateItems = useSelector(state => state.cart.items)
  const stateUserToken = useSelector(state => state.auth.userToken);
  const stateAdminToken = useSelector(state => state.auth.adminToken);

  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totalAmount = `৳${stateTotalAmount.toFixed(0)}`;
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

  const hideCartHandler = () => {
    dispatch(uiActions.toggleShowCartHandler())
  }

  const submitDataHandler = async data => {
    setIsLoading(true);
    await fetch(
      'http://localhost:8080/orders/create-order',
      {
        method: 'POST',
        body: JSON.stringify({
          userData: data,
          orderData: stateItems,
          totalOrderedPrice: stateTotalAmount,
          totalOrderedQuantity: stateTotalQuantity
        }),
        headers: {
          Authorization: `Bearer ${stateUserToken || stateAdminToken}`,
          'Content-Type': 'application/json'
        }
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
      {!(stateUserToken || stateAdminToken) && <p className={classes.loginRequired}>Please login to make order</p>}
      <button className={classes['button--alt']} onClick={hideCartHandler}>
        Close
      </button>
      {(hasItems && (stateUserToken || stateAdminToken))  && (
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
        <CheckoutForm onConfirm={submitDataHandler} onCancel={hideCartHandler} />
      )}
      {!isCheckout && modalButton}
    </React.Fragment>
  );

  const loadingModal = <p>Order Sending...</p>

  const orderCompleteModal = <React.Fragment>
    <p>Order Complete!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={hideCartHandler}>
        Close
      </button>
    </div>
  </React.Fragment>

  return <Modal>
    {!isLoading && !orderComplete && cartModal}
    {isLoading && loadingModal}
    {orderComplete && !isLoading && orderCompleteModal}
  </Modal>;
};

export default Cart;