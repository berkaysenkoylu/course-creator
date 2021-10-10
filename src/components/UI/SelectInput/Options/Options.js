import React from 'react';

import classes from './Options.module.scss';
import Option from './Option/Option';

const Options = (props) => {
    const optionSelectedHandler = (value) => {
        props.selectedOption(value);
    }

    let options = null;
    if(props.show) {
        options = (
            <ul className={classes.SelectOptions} ref={props.optionsRef}>
                {props.options.map(option => {
                    return <Option key={option} value={option} onOptionSelected={optionSelectedHandler}></Option>
                })}
            </ul>
        )
    }

    return (
        options
    )
}

export default Options;