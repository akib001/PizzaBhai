import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, {Suspense} from 'react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {Navigate} from 'react-router-dom';
import { cartActions } from './store/cart-slice';
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboardPage'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboardPage'));

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
      <Suspense fallback={<p>Loading..</p>}>
        <Routes>
        <Route path="/" element={<HomePage />}/>
        {/* <Route path="/auth" element={<AuthPage/>}/> */}
        {/* blocks pages if user isn't logged in */}
        <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard/> : <Navigate to={'/'} />}/>
        <Route path="/user" element={isUserLoggedIn ? <UserDashboard/> : <Navigate to={'/'} />}/>
      </Routes>
      </Suspense>      
    </Layout>
  );
}

export default App;
