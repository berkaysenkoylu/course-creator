import React from 'react';

import classes from './Option.module.scss';

const Option = (props) => {

    const optionSelected = () => {
        props.onOptionSelected(props.value)
    }

    return (
        <li className={classes.Option} onClick={optionSelected}>
            {props.value}
        </li>
    )
}

export default Option;