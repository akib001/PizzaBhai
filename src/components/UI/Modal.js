import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

//Backdrop is the dark backpart of the card. If you click on the Backdrop the card will minimize
const Backdrop = (props) => {
  const dispatch = useDispatch();
  return <div className={classes.backdrop} onClick={() => dispatch(uiActions.closeAllModal())}/>;
};

// ModalOverlay is the white card with it's content. Modal will contain all of it's children with props.children
const ModalOverlay = (props) => {
  const stateShowCart = useSelector(state => state.ui.showCart)
  return (
    <div className={stateShowCart ? classes.cartModal : classes.authModal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Portal element consists of Modal backdrop and ModalOverlay. Const portalElement grabs overlays div in the public html file.
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
