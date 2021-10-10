import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Backdrop.module.scss';

const Backdrop = (props) => 
    ReactDOM.createPortal(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null,
        document.getElementById('backdrop-root')
    );

export default Backdrop;