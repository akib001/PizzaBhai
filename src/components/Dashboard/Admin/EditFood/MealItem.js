import classes from './MealItem.module.css';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../../../store/ui-slice';

const MealItem = (props) => {
  const dispatch = useDispatch();

  const stateAdminToken = (state => state.auth.adminToken);

  const editFormHandler = () => {
    dispatch(uiActions.toggleshowEditFormHandler());
    dispatch(
      uiActions.replaceEditFormData({
        id: props.id,
        title: props.title,
        imageUrl: props.imageUrl,
        price: props.price,
        description: props.description,
        adminId: props.adminId,
      })
    );
  };

  const deleteMealHandler = async () => {
    await fetch(`http://localhost:8080/meals/delete-meal/${props.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${stateAdminToken}`,
        'Content-Type': 'application/json'
      },
    });

    dispatch(uiActions.toggleRenderMealList());
  }

  const price = `৳${props.price.toFixed(0)}`;

  return (
    <li className={classes.meal}>
      <div className={classes['meal-info']}>
        <div className={classes['food-image']}>
          <img src={props.imageUrl} alt="" />
        </div>
        <div>
          <h3>{props.title}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
      </div>
      <div>
        {/* <MealItemForm id={props.id} onAddToCart={addToCartHandler} /> */}
        <div className={classes.buttonContainer}>
          <button className={classes.editBtn} onClick={editFormHandler}>
            Edit
          </button>
          <button className={classes.deleteBtn} onClick={deleteMealHandler}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default MealItem;
