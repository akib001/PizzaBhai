import { Fragment } from 'react';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import AddFoodForm from './AddFoodForm';
import { useState } from 'react';
import classes from './Admin.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

const Admin = () => {
  const dispatch = useDispatch();

  const stateAdminToken = useSelector(state => state.auth.adminToken);
  const stateShowAddFood = useSelector(state => state.ui.showAddFood);

  const toggleShowAddFoodHandler = () => {
    dispatch(uiActions.toggleShowAddFoodHandler());
  }

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
        <button onClick={toggleShowAddFoodHandler}>Add New Food Item</button>
      </div>
      
      {stateShowAddFood && <AddFoodForm onConfirm={formSubmitHandler} onHideAddFoodFormHandler={toggleShowAddFoodHandler} />}
      <OrderList />
    </Fragment>
  );
};

export default Admin;
