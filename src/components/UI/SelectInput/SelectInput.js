import React, { useState, useRef, useEffect } from 'react';

import classes from './SelectInput.module.scss';
import Options from './Options/Options';

const SelectInput = (props) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selected, setSelected] = useState(3);

    let optionsRef = useRef(null);
    let buttonRef = useRef(null);

    useEffect(() => {
        setSelected(props.itemPerPageList[0] || '');
    }, [props.itemPerPageList]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // eslint-disable-next-line
    }, [showOptions]);

    const handleClickOutside = (event) => {
        if((optionsRef.current && buttonRef.current.contains(event.target))) {
            return;
        }

        if(!(optionsRef.current && optionsRef.current.contains(event.target))) {
            if(showOptions) {
                setShowOptions(showOptions => !showOptions);
            }
        }
    }
    
    const onSelectInputClickedHandler = () => {
        setShowOptions(showOptions => !showOptions);
    }

    const onSelectOptionHandler = (value) => {
        setSelected(value);
        setShowOptions(showOptions => !showOptions);

        props.valueSelected(value);
    }
    
    return (
        <>
            <div className={classes.SelectInputWrapper}>
                <label>{props.label}</label>
                <div className={classes.SelectInput} onClick={onSelectInputClickedHandler} ref={buttonRef}>
                    {selected}

                    
                </div>
                <Options
                    show={showOptions}
                    options={props.itemPerPageList}
                    selectedOption={onSelectOptionHandler}
                    optionsRef={optionsRef} />
            </div>
        </>
    )
}

export default SelectInput;