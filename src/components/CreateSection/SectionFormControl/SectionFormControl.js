import React from 'react';

import classes from './SectionFormControl.module.scss';
import Input from '../../UI/Input/Input';
import PageBreak from '../../UI/PageBreak/PageBreak';

const SectionFormControl = (props) => {
    const { isPageBreak, formControl } = props;

    const onInputChangedHandler = (event) => {
        props.inputChanged(event.target.value);
    }

    let content = (
        !isPageBreak ? <Input
            elementType={formControl.elementType}
            elementConfig={formControl.elementConfig}
            label={formControl.label}
            value={formControl.value}
            touched={formControl.touched}
            isValid={formControl.valid}
            changed={onInputChangedHandler} /> : <PageBreak />
    );

    return (
        <div className={classes.SectionFormControl}>
            {content}
            <span className={classes.SectionFormControl__Remove} onClick={props.removed}>
                &nbsp;
            </span>
        </div>
    )
}

export default SectionFormControl;