import { Fragment, useState } from 'react';
import OrderList from './OrderList';
import OrderSummary from './OrderSummary';
import classes from './Admin.module.css';
import AddNewFood from './AddNewFood';
import ShowMeals from './EditFood/ShowMeals';
import { useSelector } from 'react-redux';
import EditFoodModal from './EditFood/EditFoodModal';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('orderList');

  const stateShowEditFoodModal = useSelector(state => state.ui.showEditForm);

  const tabsHandler = e => {
    setSelectedTab(e.target.value);
  }

  let content;

  if (selectedTab === 'orderList') {
    content = <OrderList />
  }

  if (selectedTab === 'addNewFood') {
    content = <AddNewFood/>
  }

  if (selectedTab === 'editFoodItem') {
    content = <ShowMeals/>
  }

  return (
    <Fragment>
      <OrderSummary />
      {stateShowEditFoodModal && <EditFoodModal/>}
      <div className={classes.container}>
        <div className={classes.tabs}>
          <input type="radio" id="orderList" onChange={tabsHandler} value='orderList' name="tabs"  />
          <label className={classes.tab} htmlFor="orderList">
            Order List
          </label>
          <input type="radio" id="addNewFood" onChange={tabsHandler} value='addNewFood' name="tabs" />
          <label className={classes.tab} htmlFor="addNewFood">
            Add New Food
          </label>
          <input type="radio" id="editFoodItem" onChange={tabsHandler} value='editFoodItem' name="tabs" />
          <label className={classes.tab} htmlFor="editFoodItem">
            Edit Food Item
          </label>
          <span className={classes.glider}></span>
        </div>
      </div>

      {content}
      
    </Fragment>
  );
};

export default Admin;
