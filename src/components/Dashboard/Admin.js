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

  return (
    <Fragment>
      <OrderSummary />
      <button onClick={addFoodHandler}>Add New Food Item</button>
      <AddFoodForm />
      <OrderList />
    </Fragment>
  );
};

export default Admin;
