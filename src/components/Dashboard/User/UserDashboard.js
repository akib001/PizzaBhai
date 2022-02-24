import React from 'react';
import classes from './UserDashboard.module.css';
import { useSelector } from 'react-redux';
import UserOrder from './UserOrder';

function UserDashboard() {
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);

  return (
    <React.Fragment>
      <section className={classes.summary}>
        <h2>Hi, {userName}</h2>
        <h2>You have 0 Orders</h2>
      </section>
      <UserOrder email={userEmail} />
    </React.Fragment>
  );
}

export default UserDashboard;