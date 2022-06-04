import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';
import React from 'react';
=======
import React, {Suspense} from 'react';
>>>>>>> Development
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage'
import AdminDashboard from './pages/AdminDashboard';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {Navigate} from 'react-router-dom';
<<<<<<< HEAD
=======
import { cartActions } from './store/cart-slice';
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboardPage'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboardPage'));

>>>>>>> Development
let runFirstTime = true;

function App() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const isUserLoggedIn = useSelector(state => state.auth.userToken);
  const isAdminLoggedIn = useSelector(state => state.auth.adminToken);

  useEffect(() => {
    const retrievedCart = localStorage.getItem('cart')
        
    if (retrievedCart) {
      const cartObject = JSON.parse(retrievedCart)
      dispatch(cartActions.replaceCart({
      items: cartObject.items || [],
      totalQuantity: cartObject.totalQuantity,
      totalAmount: cartObject.totalAmount
    }));
    }    
  }, [dispatch]);

  useEffect(() => {
    if (runFirstTime) {
      runFirstTime = false;
      return;
    }

    if (cart.changed) {

      // Browser storage doesn't support object that's why I used JSON stringify
      localStorage.setItem('cart', JSON.stringify({
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalAmount: cart.totalAmount
      }))
    }
  }, [cart, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        {/* <Route path="/auth" element={<AuthPage/>}/> */}
        {/* blocks pages if user isn't logged in */}
        <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard/> : <Navigate to={'/'} />}/>
        <Route path="/user" element={isUserLoggedIn ? <UserDashboard/> : <Navigate to={'/'} />}/>
      </Routes>
    </Layout>
  );
}

export default App;
