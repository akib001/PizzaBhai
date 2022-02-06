import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';
import React, {Suspense} from 'react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {Navigate} from 'react-router-dom';

const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));


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
      <Suspense fallback={<p>Loading..</p>}>
        <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/auth" element={<AuthPage></AuthPage>}/>
        <Route path="/admin" element={isLoggedIn ? <AdminDashboard/> : <Navigate to={'/auth'} />}/>
      </Routes>
      </Suspense>      
    </Layout>
  );
}

export default App;
