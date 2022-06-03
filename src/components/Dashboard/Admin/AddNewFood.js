import React, { useState } from 'react';
import classes from './AddNewFood.module.css';
import useInput from '../../../hooks/use-input';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

function AddNewFood(props) {
  const fileInputRef = useRef(null);

  const stateAdminToken = useSelector((state) => state.auth.adminToken);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    value: enteredTitle,
    isValid: titleIsValid,
    isInvalid: titleIsInvalid,
    valueChangeHandler: titleChangeHandler,
    valueChangeBlueHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPrice,
    isValid: priceIsValid,
    isInvalid: priceIsInvalid,
    valueChangeHandler: priceChangeHandler,
    valueChangeBlueHandler: priceBlurHandler,
    reset: priceReset,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredDescription,
    isValid: descriptionIsValid,
    isInvalid: descriptionIsInvalid,
    valueChangeHandler: descriptionChangeHandler,
    valueChangeBlueHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;

  if (titleIsValid && priceIsValid && descriptionIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (submitData) => {
    submitData.preventDefault();

    if (!formIsValid) {
      return;
    }

    let formData = new FormData();
    // multer image name should be same as this
    formData.append('title', enteredTitle);
    formData.append('image', selectedFile);
    formData.append('price', +enteredPrice);
    formData.append('description', enteredDescription);

    await fetch('http://localhost:8080/meals/add-meal', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${stateAdminToken}`,
      },
    });

    console.log('Food Added');

    titleReset();
    priceReset();
    descriptionReset();
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  const titleInputclasses = titleIsInvalid
    ? `${classes.invalid} ${classes.control}`
    : classes.control;

  const priceInputclasses = priceIsInvalid
    ? `${classes.invalid} ${classes.control}`
    : classes.control;

  const descriptionInputclasses = descriptionIsInvalid
    ? `${classes.invalid} ${classes.control}`
    : classes.control;

  return (
    <div className={classes.container}>
      <form className={classes.form} action="" onSubmit={submitHandler}>
        <div className={titleInputclasses}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onBlur={titleBlurHandler}
            onChange={titleChangeHandler}
            value={enteredTitle}
            max="100"
          />
          {titleIsInvalid && <p>Please enter a valid Title!</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="file">Food Image</label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          {priceIsInvalid && <p>Please enter a valid Price!</p>}
        </div>

        <div className={priceInputclasses}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            onBlur={priceBlurHandler}
            onChange={priceChangeHandler}
            value={enteredPrice}
            min="1"
            max="10000"
            step="1"
          />
          {priceIsInvalid && <p>Please enter a valid Price!</p>}
        </div>

        <div className={descriptionInputclasses}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id="description"
            cols="30"
            rows="10"
            max="500"
            onBlur={descriptionBlurHandler}
            onChange={descriptionChangeHandler}
            value={enteredDescription}
          ></textarea>
          {descriptionIsInvalid && <p>Please enter a Description!</p>}
        </div>

        <div className={classes.actions}>
          <button className={classes.submit} type="submit">
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewFood;
