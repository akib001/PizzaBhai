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
        const response = await fetch('https://pizzabhai-server.herokuapp.com/meals/fetch-meals');

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();

        let loadedMeals = [];
        
        for (const key in data) {
          for (const item in data[key]) {
            // console.log(data[key][item])
            loadedMeals.push({
              id: item,
              title: data[key][item].title,
              imageUrl: data[key][item].imageUrl,
              price: +data[key][item].price,
              description: data[key][item].description,
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
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      title={meal.title}
      imageUrl={meal.imageUrl}
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
