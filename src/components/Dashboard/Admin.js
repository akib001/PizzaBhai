import { Fragment } from 'react';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import AddFoodForm from './AddFoodForm';
import { useState } from 'react';

const Admin = () => {
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);
  // This function will handle add food form
  const addFoodHandler = () => {
    setShowAddFoodForm(true);
  };

  const hideAddFoodFormHandler = (event) => {
    setShowAddFoodForm(event);
  }


  const formSubmitHandler = async (submitData) => {

    await fetch(
      'https://react-http-597d3-default-rtdb.firebaseio.com/meals.json',
      {
        method: 'POST',
        body: JSON.stringify({
          title: submitData.title,
          price: submitData.price,
          description: submitData.description,
        }),
      }
    );

    console.log('Food Added');
  };

  return (
    <Fragment>
      <OrderSummary />
      <button onClick={addFoodHandler}>Add New Food Item</button>
      {showAddFoodForm && <AddFoodForm onConfirm={formSubmitHandler} onHideAddFoodFormHandler={hideAddFoodFormHandler} />}
      <OrderList />
    </Fragment>
  );
};

export default Admin;
