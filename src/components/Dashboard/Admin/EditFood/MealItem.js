import classes from './MealItem.module.css';

const MealItem = props => {

  const price = `$${props.price.toFixed(2)}`;


  return (
    <li className={classes.meal}>
      <div className={classes['meal-info']}>
        <div className={classes['food-image']}>
        <img src={`http://localhost:8080/${props.imageUrl}`} alt="" />
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
          <button className={classes.editBtn}>Edit</button>
          <button className={classes.deleteBtn}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default MealItem;
