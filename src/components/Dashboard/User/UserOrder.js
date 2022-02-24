import React from 'react';
import { useState, useEffect } from 'react';

function UserOrder(props) {
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrdersHandler() {
      setIsError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://react-http-597d3-default-rtdb.firebaseio.com/orders.json'
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        // console.log(data);

        let loadedOrders = [];

        for (const key in data) {
          let loadedItems = [];
          for (const itemKey in data[key].orderData) {
            loadedItems.push({
              itemId: itemKey,
              itemName: data[key].orderData[itemKey].title,
              itemPrice: data[key].orderData[itemKey].price,
              itemQuantity: data[key].orderData[itemKey].quantity,
            });
          }


          loadedOrders.push({
            id: key,
            name: data[key].userData.name,
            city: data[key].userData.city,
            items: loadedItems,
          });
        }
        setOrders(loadedOrders);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false);
    }
    fetchOrdersHandler();
  }, []);

  return <div>UserOrder</div>;
}

export default UserOrder;
