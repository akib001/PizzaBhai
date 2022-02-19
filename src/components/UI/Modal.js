import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

//Backdrop is the dark backpart of the card. If you click on the Backdrop the card will minimize
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

// ModalOverlay is the white card with it's content. Modal will contain all of it's children with props.children
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Portal element consists of Modal backdrop and ModalOverlay. Const portalElement grabs overlays div in the public html file.
const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
