import React from 'react';
import { useState, useEffect } from 'react';
import classes from './UserDashboard.module.css';
import { useSelector } from 'react-redux';
import UserOrder from './UserOrder';

function UserDashboard() {

  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const stateUserToken = useSelector(state => state.auth.userToken);

  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrdersHandler() {
      setIsError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:8080/orders/fetch-orders',
          {
            headers: {
              Authorization: `Bearer ${stateUserToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        let loadedUserOrders = [];

        for (const key in data) {
          let loadedUserOrderItems = [];
          if (data[key].userData.email === userEmail) {
            for (const itemKey in data[key].orderData) {
              loadedUserOrderItems.push({
                itemId: itemKey,
                itemName: data[key].orderData[itemKey].title,
                itemPrice: data[key].orderData[itemKey].price,
                itemQuantity: data[key].orderData[itemKey].quantity,
                itemTotalPrice: data[key].orderData[itemKey].totalPrice,
              });
            }

            loadedUserOrders.push({
              id: key,
              name: data[key].userData.name,
              email: data[key].userData.email,
              phone: data[key].userData.phone,
              street: data[key].userData.street,
              city: data[key].userData.city,
              postal: data[key].userData.postal,
              items: loadedUserOrderItems,
            });
          }
        }
        setOrders(loadedUserOrders);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false);
    }
    fetchOrdersHandler();
  }, [userEmail, stateUserToken]);

  const userOrdersList = orders.map(order => (
    <UserOrder
    key={order.id}
    id={order.id}
    name={order.name}
    email={order.email}
    phone={order.phone}
    street={order.street}
    city={order.city}
    postal={order.postal}
    items={order.items}
    />
  ))

  const userOrderCount = userOrdersList.length

  let content = <h2>Found no Order.</h2>

  if (userOrdersList.length > 0) {
    content = userOrdersList;
  }

  if (isError) {
    content = <p>{isError}</p>;
  }

  if (isLoading) {
    content = <h2 className={classes.loading}>Loading...</h2>;
  } 

  return (
    <React.Fragment>
      <section className={classes.summary}>
        <h2>Hi, {userName}</h2>
        <h2>You have {userOrderCount} Orders</h2>
      </section>
      {content}
    </React.Fragment>
  );
}

export default UserDashboard;
