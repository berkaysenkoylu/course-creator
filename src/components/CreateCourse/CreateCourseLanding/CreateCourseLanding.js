import React, { useState } from 'react';

import classes from './CreateCourseLanding.module.scss';
import Input from '../../UI/Input/Input';
import Counter from '../../UI/Counter/Counter';

const INPUT_TEMPLATE = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    label: "",
    validation: {
        required: true
    },
    valid: false,
    touched: false,
    value: ''
};

const CreateCourseLanding = () => {
    const [formControls, setFormControls] = useState({
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Image URL'
            },
            label: "Image URL",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder: 'Description'
            },
            label: "Description",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [facultyFormControls, setFacultyFormControls] = useState({});

    const onInputChangedHandler = (event, formCtrl) => {

    }

    const onCounterAmountChangedHandler = (counterAmount) => {
        let newFacultyFormControls = {};
        let newFormControl = '';
        let copiedConfig = {};

        for (let i = 0; i < counterAmount; i++) {
            newFormControl = { ...INPUT_TEMPLATE };
            copiedConfig = { ...newFormControl.elementConfig };
            copiedConfig.placeholder = `Faculty ${i + 1}`;
            newFormControl.elementConfig = copiedConfig;
            newFormControl.label = `Faculty ${i + 1}`;

            newFacultyFormControls[`faculty${i}`] = newFormControl;
        }

        setFacultyFormControls(newFacultyFormControls);
    }

    let formContent = Object.keys(formControls).map(formCtrl => {
        return  <Input
            key={formCtrl}
            elementType={formControls[formCtrl].elementType}
            elementConfig={formControls[formCtrl].elementConfig}
            label={formControls[formCtrl].label}
            value={formControls[formCtrl].value}
            touched={formControls[formCtrl].touched}
            isValid={formControls[formCtrl].isValid}
            changed={(event) => onInputChangedHandler(event, formCtrl)} />
    });

    let facultyFormContent = Object.keys(facultyFormControls).map(formCtrl => {
        return  <Input
            elementType={facultyFormControls[formCtrl].elementType}
            elementConfig={facultyFormControls[formCtrl].elementConfig}
            label={facultyFormControls[formCtrl].label}
            value={facultyFormControls[formCtrl].value}
            touched={facultyFormControls[formCtrl].touched}
            isValid={facultyFormControls[formCtrl].isValid}
            changed={(event) => onInputChangedHandler(event, formCtrl)} />
    });
    
    return (
        <section className={classes.CreateCourseLanding}>
            <header className={classes.CreateCourseLanding__Header}>
                <h1>Create a course landing</h1>
            </header>

            <section className={classes.CreateCourseLanding__Body}>
                {formContent}

                <div className={classes.CreateCourseLanding__Faculty}>
                    <Counter label={'Faculty:'} counterAmountChanged={onCounterAmountChangedHandler} />

                    {facultyFormContent}
                </div>
            </section>
        </section>
    )
}

export default CreateCourseLanding;