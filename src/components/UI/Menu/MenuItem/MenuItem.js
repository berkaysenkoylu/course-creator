import React from 'react';

import classes from './MenuItem.module.scss';

const MenuItem = (props) => {
    return (
        <span className={classes.MenuItem} onClick={props.clicked}>
            {props.label}
        </span>
    )
}

export default MenuItem;