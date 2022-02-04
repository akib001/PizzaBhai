import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';
import React from 'react';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage'
import AdminDashboard from './pages/AdminDashboard';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {Navigate} from 'react-router-dom';
let runFirstTime = true;

function App() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const isLoggedIn = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (runFirstTime) {
      runFirstTime = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage></AuthPage>}/>
        <Route path="/admin" element={isLoggedIn ? <AdminDashboard/> : <Navigate to={'/auth'} />}/>
      </Routes>
    </Layout>
  );
}

export default App;
