import Header from './Header';
import React from 'react';
import Cart from '../Cart/Cart';
import { useSelector} from 'react-redux';

const Layout = props => {
  const stateShowCart = useSelector(state => state.ui.showCart);

  return (
    <React.Fragment>
      {stateShowCart && <Cart/>}
      <Header/>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
