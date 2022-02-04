import Header from './Header';
import React from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';

const Layout = props => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <React.Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
