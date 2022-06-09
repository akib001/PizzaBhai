import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = props => {
  const dispatch = useDispatch();

  const price = `৳${props.price.toFixed(0)}`;

  const addToCartHandler = amount => {
    dispatch(
      cartActions.addToCart({
        id: props.id,
        title: props.title,
        quantity: amount,
        price: props.price,
        totalPrice: props.price,
      })
    );
  };

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
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
