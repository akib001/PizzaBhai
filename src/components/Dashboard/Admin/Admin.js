import { Fragment } from 'react';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import AddFoodForm from './AddFoodForm';
import { useState } from 'react';
import classes from './Admin.module.css'
import { useSelector } from 'react-redux';

const Admin = () => {
  const [showAddFoodForm, setShowAddFoodForm] = useState(false);

  const stateAdminToken = useSelector(state => state.auth.adminToken);


  // This function will handle add food form
  const addFoodHandler = () => {
    setShowAddFoodForm(true);
  };

  const hideAddFoodFormHandler = (event) => {
    setShowAddFoodForm(event);
  }

  // TODO: 500 server error fix
  const formSubmitHandler = async (submitData) => {
    let formData = new FormData();
    // multer image name should be same as this 
    formData.append('title', submitData.title);
    formData.append('image', submitData.image);
    formData.append('price', submitData.price);
    formData.append('description', submitData.description);

    await fetch(
      'http://localhost:8080/meals/add-meal',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${stateAdminToken}`,
        }
      }
    );

    console.log('Food Added');
  };

  return (
    <Fragment>
      <OrderSummary />
      <div className={classes.container}>
        <button onClick={addFoodHandler}>Add New Food Item</button>
      </div>
      
      {showAddFoodForm && <AddFoodForm onConfirm={formSubmitHandler} onHideAddFoodFormHandler={hideAddFoodFormHandler} />}
      <OrderList />
    </Fragment>
  );
};

export default Admin;
