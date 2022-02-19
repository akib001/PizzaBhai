import React from 'react';
import classes from './AddFoodForm.module.css'

function AddFoodForm() {
  return (
      <div>
          {/* Form */}
          {/* Input Fields like checkout */}
          {/* send request to firebase */}
          {/* show a success message */}
          <form action="">
            <label htmlFor="title">Title</label>
            <input type="text" id='title'/>
            <label htmlFor="price">Price</label>
            <input type='number' id='price'/>
            <label htmlFor="description">Description</label>
            <input type="text" id='description'/>
            <button type='submit'>Add Food</button>
            <button type='reset'>Clear All</button>
          </form>
      </div>
  )
}

export default AddFoodForm;