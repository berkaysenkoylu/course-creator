import React, { useState } from 'react';

import classes from './CreateCourse.module.scss';
import Input from '../UI/Input/Input';
import Counter from '../UI/Counter/Counter';
import Button from '../UI/Button/Button';
import checkValidity from '../../utility/formValidation';
import addInputField from '../../utility/addInputField';

const CreateCourse = () => {
    const [courseDataFormControls, setCourseDataFormControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Course Title'
            },
            label: "Course Title",
            validation: {
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false,
            value: ''
        },
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'url',
                placeholder: 'Image URL'
            },
            label: "Image URL",
            validation: {
                required: true,
                isURL: true
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
    const [courseContentTitleFormControls, setCourseContentTitleFormControls] = useState({});
    const [formValid, setFormValid] = useState(false);

    const onCourseCreatedHandler = () => {
        let courseData = {
            name: (courseDataFormControls.name || {}).value || '',
            landing: {
                image: (courseDataFormControls.image || {}).value || '',
                info: (courseDataFormControls.description || {}).value || '',
                faculty: Object.keys(facultyFormControls).map(facultyFrmCtrl => {
                    return facultyFormControls[facultyFrmCtrl].value || '';
                })
            },
            introduction: '',
            quiz: '',
            weeks: []
        };

        console.log(courseData);
    }

    const onInputChangedHandler = (event, formCtrl, operationType) => {
        let inputtedValue = event.target.value;

        switch (operationType) {
            case 'faculty':
                let copiedFacultyFormControls = { ...facultyFormControls };
                let copiedFacultyFormCtrl = { ...copiedFacultyFormControls[formCtrl] };

                copiedFacultyFormCtrl.value = inputtedValue;
                copiedFacultyFormCtrl.touched = true;
                copiedFacultyFormCtrl.valid = checkValidity(inputtedValue, copiedFacultyFormCtrl.validation);

                copiedFacultyFormControls[formCtrl] = copiedFacultyFormCtrl;

                setFacultyFormControls(copiedFacultyFormControls);

                checkFormValidity([...Object.values(courseDataFormControls), ...Object.values(copiedFacultyFormControls)]);
                break;
            case 'section':
                let copiedCourseContentTitleFormControls = { ...courseContentTitleFormControls };
                let copiedCourseTitleFormCtrl = { ...copiedCourseContentTitleFormControls[formCtrl] };

                copiedCourseTitleFormCtrl.value = inputtedValue;
                copiedCourseTitleFormCtrl.touched = true;
                copiedCourseTitleFormCtrl.valid = checkValidity(inputtedValue, copiedCourseTitleFormCtrl.validation);

                copiedCourseContentTitleFormControls[formCtrl] = copiedCourseTitleFormCtrl;

                setCourseContentTitleFormControls(copiedCourseContentTitleFormControls);

                checkFormValidity([...Object.values(courseContentTitleFormControls), ...Object.values(copiedCourseContentTitleFormControls)]);
                break;
            default:
                let copiedCourseDataFormControls = { ...courseDataFormControls };
                let copiedFormCtrl = { ...copiedCourseDataFormControls[formCtrl] };

                copiedFormCtrl.value = inputtedValue;
                copiedFormCtrl.touched = true;
                copiedFormCtrl.valid = checkValidity(inputtedValue, copiedFormCtrl.validation);

                copiedCourseDataFormControls[formCtrl] = copiedFormCtrl;
                
                setCourseDataFormControls(copiedCourseDataFormControls);

                if (Object.keys(facultyFormControls).length > 0) {
                    checkFormValidity([...Object.values(copiedCourseDataFormControls), ...Object.values(facultyFormControls)]);
                } else {
                    setFormValid(false);
                }
                break;
        }
    }

    const onCounterAmountChangedHandler = (operation, operationType) => {
        // Operation: 1 (Increment)
        // Operation: -1 (Decrement)
        if (operationType === 'faculty') {
            let copiedFacultyFormControls = { ...facultyFormControls };
            let keyArr = Object.keys(copiedFacultyFormControls);
    
            if (operation === 1) {
                let formCtrlCount = keyArr.length;
    
                copiedFacultyFormControls = addInputField(copiedFacultyFormControls, {
                    inputKey: `faculty${formCtrlCount}`,
                    placeholder: `Faculty ${formCtrlCount + 1}`,
                    label: `Faculty ${formCtrlCount + 1}`,
                    validation: {
                        required: true,
                        minLength: 8
                    }
                });
    
                setFormValid(false);
            } else {
                delete copiedFacultyFormControls[keyArr.pop()];
            }

            setFacultyFormControls(copiedFacultyFormControls);
        } else {
            let copiedCourseContentTitleFormControls = { ...courseContentTitleFormControls };
            let keyArr = Object.keys(copiedCourseContentTitleFormControls);
    
            if (operation === 1) {
                let formCtrlCount = keyArr.length;
    
                copiedCourseContentTitleFormControls = addInputField(copiedCourseContentTitleFormControls, {
                    inputKey: `section${formCtrlCount}`,
                    placeholder: `Section ${formCtrlCount + 1}`,
                    label: `Section ${formCtrlCount + 1}`,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                });
    
                setFormValid(false);
            } else {
                delete copiedCourseContentTitleFormControls[keyArr.pop()];
            }

            setCourseContentTitleFormControls(copiedCourseContentTitleFormControls);
        } 
    }

    const checkFormValidity = (wholeForm) => {
        let isValid = true;

        wholeForm.forEach(formCtrl => {
            isValid = isValid && formCtrl.valid;
        });

        setFormValid(isValid);
    }

    let formContent = Object.keys(courseDataFormControls).map(formCtrl => {
        return <Input
            key={formCtrl}
            elementType={courseDataFormControls[formCtrl].elementType}
            elementConfig={courseDataFormControls[formCtrl].elementConfig}
            label={courseDataFormControls[formCtrl].label}
            value={courseDataFormControls[formCtrl].value}
            touched={courseDataFormControls[formCtrl].touched}
            isValid={courseDataFormControls[formCtrl].valid}
            changed={(event) => onInputChangedHandler(event, formCtrl, 'course')} />
    });

    let facultyFormContent = Object.keys(facultyFormControls).map(formCtrl => {
        return <Input
            key={formCtrl}
            elementType={facultyFormControls[formCtrl].elementType}
            elementConfig={facultyFormControls[formCtrl].elementConfig}
            label={facultyFormControls[formCtrl].label}
            value={facultyFormControls[formCtrl].value}
            touched={facultyFormControls[formCtrl].touched}
            isValid={facultyFormControls[formCtrl].valid}
            changed={(event) => onInputChangedHandler(event, formCtrl, 'faculty')} />
    });

    let sectionFormControls = Object.keys(courseContentTitleFormControls).map(formCtrl => {
        return <Input
            key={formCtrl}
            elementType={courseContentTitleFormControls[formCtrl].elementType}
            elementConfig={courseContentTitleFormControls[formCtrl].elementConfig}
            label={courseContentTitleFormControls[formCtrl].label}
            value={courseContentTitleFormControls[formCtrl].value}
            touched={courseContentTitleFormControls[formCtrl].touched}
            isValid={courseContentTitleFormControls[formCtrl].valid}
            changed={(event) => onInputChangedHandler(event, formCtrl, 'section')} />
    });

    return (
        <section className={classes.CreateCourse}>
            <header className={classes.CreateCourse__Header}>
                <h1>Create a course</h1>
            </header>

            <section className={classes.CreateCourse__Body}>
                {formContent}

                <div className={classes.CreateCourse__Faculty}>
                    <Counter label={'Faculty:'} counterAmountChanged={(operationType) => onCounterAmountChangedHandler(operationType, 'faculty')} />

                    {facultyFormContent}

                    <Counter label={'Sections:'} counterAmountChanged={(operationType) => onCounterAmountChangedHandler(operationType, 'section')} />

                    {sectionFormControls}
                </div>
            </section>

            <div className={classes.CreateCourse__Cta}>
                <Button
                    disabled={!formValid}
                    clicked={onCourseCreatedHandler}>Create</Button>
            </div>
        </section>
    );
}

export default CreateCourse;