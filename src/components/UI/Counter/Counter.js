import React, { useState } from 'react';

import classes from './Counter.module.scss';

const Counter = (props) => {
    const [counter, setCounter] = useState(0);

    const counterChanged = (isIncrement) => {
        let newCounter = counter;

        if (isIncrement) {
            newCounter = newCounter + 1;
        } else {
            if (counter === 0) {
                return;
            }

            newCounter = newCounter - 1;
        }

        setCounter(newCounter);

        props.counterAmountChanged(newCounter - counter);
    }

    return (
        <div className={classes.Counter}>
            <span className={classes.Counter__Label}>{props.label}</span>
            <div className={classes.Counter__Body}>
                <span
                    className={classes.Counter__Button}
                    onClick={() => counterChanged(false)}>
                    -
                </span>
                <span className={classes.Counter__Amount}>{counter}</span>
                <span
                    className={classes.Counter__Button}
                    onClick={() => counterChanged(true)}>
                    +
                </span>
            </div>
        </div>
    );
};

export default Counter;