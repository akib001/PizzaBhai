import React, { useState } from 'react';
import classes from './EditFoodModal.module.css';
import Modal from '../../../UI/Modal'
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../../store/ui-slice';

function EditFoodModal(props) {
  const dispatch = useDispatch();

  const stateAdminToken = useSelector((state) => state.auth.adminToken);
  const stateEditFormData = useSelector(state => state.ui.editFormData);
  const [selectedFile, setSelectedFile] = useState(null);

  // TODO: A component is changing a controlled input to be uncontrolled.
  const inputChangeHandler = e => {
    dispatch(uiActions.updateEditFormData({
      type: e.target.name,
      newData: e.target.value
    }))
  }

  const submitHandler = async (submitData) => {
    submitData.preventDefault();

    console.log(selectedFile);
    let formData = new FormData();
    // multer image name should be same as this
    formData.append('title', stateEditFormData.title);
    formData.append('image', selectedFile);
    formData.append('price', +stateEditFormData.price);
    formData.append('description', stateEditFormData.description);
    formData.append('adminId', stateEditFormData.adminId);
    formData.append('id', stateEditFormData.id);

    await fetch(`https://pizzabhai-server.herokuapp.com/meals/update-meal/${stateEditFormData.id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${stateAdminToken}`,
      },
    });

    console.log('Food Edited');
    dispatch(uiActions.closeAllModal());
    dispatch(uiActions.toggleRenderMealList());
  };

  return (
    <Modal>
      <form className={classes.form} action="" onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name='title'
            onChange={inputChangeHandler}
            value={stateEditFormData.title}
            max="100"
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="file">Food Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          /> 
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name='price'
            onChange={inputChangeHandler}
            value={stateEditFormData.price}
            min="1"
            max="10000"
            step="1"
          />
        
        </div>

        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name='description'
            cols="30"
            rows="10"
            max="500"
            onChange={inputChangeHandler}
            value={stateEditFormData.description}
          ></textarea>  
        </div>
        <div className={classes.actions}>
          <button className={classes.submit} type="submit">
            Update Food
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditFoodModal;
