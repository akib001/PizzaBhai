import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-597d3-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
        totalAmount: cartData.totalAmount
      }));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendCartData = cart => {
  return async dispatch => {
    
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-597d3-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.totalAmount
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Cart Sending Error!');
      }
    };

    try {
      await sendRequest();      
    } catch (error) {
      console.log(error.message);
    }
  };
};
