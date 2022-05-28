import Header from './Header';
import React from 'react';
import Cart from '../Cart/Cart';
import { useSelector} from 'react-redux';
import AuthModal from '../Auth/AuthModal';

const Layout = props => {
  const stateShowCart = useSelector(state => state.ui.showCart);
  const stateShowAuth = useSelector(state => state.ui.showAuth);

  return (
    <React.Fragment>
      {stateShowCart && <Cart/>}
      {stateShowAuth && <AuthModal/>}
      <Header/>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
