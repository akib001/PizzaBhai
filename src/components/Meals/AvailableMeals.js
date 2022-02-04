import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useState, useEffect } from 'react';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMealsHandler() {
      setIsError(null);
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://react-http-597d3-default-rtdb.firebaseio.com/meals.json'
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        let loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false);
    }
    fetchMealsHandler();
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      title={meal.title}
      description={meal.description}
      price={meal.price}
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

export default AvailableMeals;
