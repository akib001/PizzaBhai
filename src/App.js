import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, {Suspense} from 'react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {Navigate} from 'react-router-dom';
import { cartActions } from './store/cart-slice';
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));


let runFirstTime = true;

function App() {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const isLoggedIn = useSelector(state => state.auth.token)

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
