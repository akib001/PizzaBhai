import Header from './Header';
import React from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import AuthModal from '../Auth/AuthModal';

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
      <AuthModal/>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
