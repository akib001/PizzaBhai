import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const dispatch = useDispatch();
  const stateItems = useSelector(state => state.cart.items);
  const stateTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const [ cartBtnBump, setCartBtnBump] = useState(false);

  const cartBtnClasses = `${classes.button} ${cartBtnBump ? classes.bump : ''}`;

  useEffect(() => {
    if (stateItems.length === 0) {
      return;
    }
    setCartBtnBump(true);

    const timer = setTimeout(() => {
      setCartBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [stateItems])

  return (
    <button className={cartBtnClasses} onClick={() => dispatch(uiActions.toggleShowCartHandler())}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{stateTotalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
