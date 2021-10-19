import React, { useState } from 'react';

import classes from './CreateSection.module.scss';
import Menu from '../UI/Menu/Menu';
import Button from '../UI/Button/Button';
import SectionFormControl from './SectionFormControl/SectionFormControl';
import addInputField from '../../utility/addInputField';
import checkValidity from '../../utility/formValidation';

const SECTION_ELEMENTS = ['Title', 'Teacher', 'Paragraph', 'Image Url', 'Video Url', 'Pagebreak'];

const CreateSection = props => {
    const [sectionFormControls, setSectionFormControls] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);

    const onMenuItemClickedHandler = item => {
        let copiedSectionFormControls = { ...sectionFormControls };
        let formControlArr = Object.keys(copiedSectionFormControls);
        
        let formControllerNumbers = formControlArr.filter(frmCtrller => frmCtrller.indexOf(item) !== -1)
            .map(ctrller => parseInt(ctrller.replace(/[^0-9]/g, '')));

        let index = 0;

        while (formControllerNumbers.indexOf(index) !== -1) {
            index++;
        }

        if (item !== 'Pagebreak') {
            copiedSectionFormControls = addInputField(copiedSectionFormControls, {
                type: item !== 'Paragraph' ? 'input' : 'textarea',
                inputKey: `${item + index}`,
                placeholder: `${item + ' ' + (index + 1)}`,
                label: `${item + ' ' + (index + 1)}`,
                validation: {
                    required: true
                }
            });

            setSectionFormControls(copiedSectionFormControls);

            setFormIsValid(false)
        } else {
            if (formControlArr.length > 0) {
                if (formControlArr.pop().indexOf('Pagebreak') === -1) {
                    copiedSectionFormControls[`${item + index}`] = true;

                    setSectionFormControls(copiedSectionFormControls);
                }
            }
        }
    }

    const onFormControlRemovedHandler = (frmCtrl) => {
        let copiedSectionFormControls = { ...sectionFormControls };
        
        delete copiedSectionFormControls[`${frmCtrl}`];

        // We need to handle pagebreaks here. No two consecutive page breaks should be present.
        let frmCtrlArr = Object.keys(copiedSectionFormControls);

        if (frmCtrlArr.length > 0) {
            if (frmCtrlArr[0].indexOf('Pagebreak') !== -1) {
                delete copiedSectionFormControls[`${frmCtrlArr[0]}`];
            }
    
            let dupIndex = 0;
            for (let i = 0; i < frmCtrlArr.length - 1; i++) {
                if (frmCtrlArr[i].indexOf('Pagebreak') !== -1) {
                    if (frmCtrlArr[i+1].indexOf('Pagebreak') !== -1) {
                        dupIndex = i;
                    }
                }
            }
    
            if(dupIndex !== 0) {
                delete copiedSectionFormControls[`${frmCtrlArr[dupIndex]}`];
            }
        }

        setSectionFormControls(copiedSectionFormControls);
    }

    const checkFormValidity = (wholeForm) => {
        let isValid = true;

        wholeForm.forEach(formCtrl => {
            isValid = isValid && formCtrl.valid;
        });

        setFormIsValid(isValid);
    }

    const onFormInputChangedHandler = (value, formControl) => {
        let copiedSectionFormControls = { ...sectionFormControls };
        let copiedFormControl = { ...copiedSectionFormControls[formControl] };

        copiedFormControl.touched = true;
        copiedFormControl.value = value;
        copiedFormControl.valid = checkValidity(value, copiedFormControl.validation);

        copiedSectionFormControls[formControl] = copiedFormControl;

        setSectionFormControls(copiedSectionFormControls);

        checkFormValidity(Object.values(copiedSectionFormControls).filter(obj => typeof obj.valid !== 'undefined'));
    }

    const onSectionCreatedHandler = () => {
        let initalSection = [];
    }

    let content = Object.keys(sectionFormControls).map(frmCtrl => {
        return <SectionFormControl
            key={frmCtrl}
            label={frmCtrl}
            isPageBreak={frmCtrl.indexOf('Pagebreak') !== -1}
            formControl={sectionFormControls[frmCtrl]}
            inputChanged={(value) => onFormInputChangedHandler(value, frmCtrl)}
            removed={() => onFormControlRemovedHandler(frmCtrl)}
        />;
    });

    return (
        <section className={classes.CreateSection}>
            <header className={classes.CreateSection__Header}>
                <h1>Create a section</h1>
            </header>

            <section className={classes.CreateSection__Body}>
                <div className={classes.CreateSection__Body__FormField}>
                    {content}
                </div>

                <div className={classes.CreateSection__Body__Menu}>
                    <Menu
                        items={SECTION_ELEMENTS}
                        menuItemClicked={onMenuItemClickedHandler} />
                </div>
            </section>

            <div className={classes.CreateSection__Cta}>
                <Button
                    disabled={!formIsValid}
                    clicked={onSectionCreatedHandler}
                >Create</Button>
            </div>
        </section>
    );
}

export default CreateSection;