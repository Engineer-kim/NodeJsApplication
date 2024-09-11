import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

const errorHandler = props => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        {
          console.log("props.error::::::::::::::::"+ props.error)
        }
         <p>{props.error.message || 'An unknown error occurred.'}</p>
      </Modal>
    )}
  </Fragment>
);

export default errorHandler;
