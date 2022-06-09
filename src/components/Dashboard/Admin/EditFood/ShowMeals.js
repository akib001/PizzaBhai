import Card from '../../../UI/Card'
import MealItem from './MealItem'
import classes from './ShowMeals.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ShowMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stateRenderMealList = useSelector(state => state.ui.renderMealList);

  useEffect(() => {
    async function fetchMealsHandler() {
      setIsError(null);
      setIsLoading(true);
      console.log('Rerendered ' + stateRenderMealList)
      try {
        const response = await fetch('http://localhost:8080/meals/fetch-meals');

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        let loadedMeals = [];
        
        for (const key in data) {
          for (const item in data[key]) {
            // console.log(data[key][item])
            loadedMeals.push({
              id: data[key][item]._id,
              title: data[key][item].title,
              imageUrl: data[key][item].imageUrl,
              price: +data[key][item].price,
              description: data[key][item].description,
              adminId: data[key][item].adminId
            });
          }
        }
        setMeals(loadedMeals);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false);
    }
    fetchMealsHandler();
  }, [stateRenderMealList]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      title={meal.title}
      imageUrl={meal.imageUrl}
      description={meal.description}
      price={meal.price}
      adminId={meal.adminId}
    />
  ));

  let content = <p>Found no meals.</p>;

  if (mealsList.length > 0) {
    content = mealsList;
  }

  if (isError) {
    content = <p>{isError}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default ShowMeals;
