import React, { useState, useEffect } from 'react';

import classes from './CreateCourse.module.scss';
import Input from '../UI/Input/Input';
import Counter from '../UI/Counter/Counter';
import Button from '../UI/Button/Button';
import SelectInput from '../UI/SelectInput/SelectInput';
import checkValidity from '../../utility/formValidation';
import addInputField from '../../utility/addInputField';

const QUIZ_LIST = ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];

const CreateCourse = props => {
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
    const [selectedQuiz, setSelectedQuiz] = useState(QUIZ_LIST[0]);

    useEffect(() => {
        let facultyArr = Object.values(facultyFormControls);
        let courseContentTitleArr = Object.values(courseContentTitleFormControls);

        if (facultyArr.length === 0 || courseContentTitleArr.length === 0)
            setFormValid(false);
        else
            checkFormValidity([...Object.values(courseDataFormControls), ...facultyArr, ...courseContentTitleArr]);
    }, [courseDataFormControls, facultyFormControls, courseContentTitleFormControls]);

    const onQuizSelectedHandler = (selectedQuiz) => {
        setSelectedQuiz(selectedQuiz);
    }

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
            quiz: selectedQuiz,
            sections: Object.keys(courseContentTitleFormControls).map(frmCtrl => {
                return {
                    sectionName: courseContentTitleFormControls[frmCtrl].value || '',
                    sectionContent: []
                }
            })
        };

        props.courseCreated(courseData);
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

                // checkFormValidity([...Object.values(courseDataFormControls), ...Object.values(copiedFacultyFormControls)]);
                break;
            case 'section':
                let copiedCourseContentTitleFormControls = { ...courseContentTitleFormControls };
                let copiedCourseTitleFormCtrl = { ...copiedCourseContentTitleFormControls[formCtrl] };

                copiedCourseTitleFormCtrl.value = inputtedValue;
                copiedCourseTitleFormCtrl.touched = true;
                copiedCourseTitleFormCtrl.valid = checkValidity(inputtedValue, copiedCourseTitleFormCtrl.validation);

                copiedCourseContentTitleFormControls[formCtrl] = copiedCourseTitleFormCtrl;

                setCourseContentTitleFormControls(copiedCourseContentTitleFormControls);

                // checkFormValidity([...Object.values(courseContentTitleFormControls), ...Object.values(copiedCourseContentTitleFormControls)]);
                break;
            default:
                let copiedCourseDataFormControls = { ...courseDataFormControls };
                let copiedFormCtrl = { ...copiedCourseDataFormControls[formCtrl] };

                copiedFormCtrl.value = inputtedValue;
                copiedFormCtrl.touched = true;
                copiedFormCtrl.valid = checkValidity(inputtedValue, copiedFormCtrl.validation);

                copiedCourseDataFormControls[formCtrl] = copiedFormCtrl;
                
                setCourseDataFormControls(copiedCourseDataFormControls);

                // if (Object.keys(facultyFormControls).length > 0) {
                //     checkFormValidity([...Object.values(copiedCourseDataFormControls), ...Object.values(facultyFormControls)]);
                // } else {
                //     setFormValid(false);
                // }
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
                    type: 'input',
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
                    type: 'input',
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

    /*
        TODO: This is pretty messy, fix later
    */
    const createFormContent = (formControls, formType) => {
        let content = Object.keys(formControls).map(formCtrl => {
            return <Input
                key={formCtrl}
                elementType={formControls[formCtrl].elementType}
                elementConfig={formControls[formCtrl].elementConfig}
                label={formControls[formCtrl].label}
                value={formControls[formCtrl].value}
                touched={formControls[formCtrl].touched}
                isValid={formControls[formCtrl].valid}
                changed={(event) => onInputChangedHandler(event, formCtrl, formType)} />
        });

        return content;
    }

    return (
        <section className={classes.CreateCourse}>
            <header className={classes.CreateCourse__Header}>
                <h1>Create a course</h1>
            </header>

            <section className={classes.CreateCourse__Body}>
                {createFormContent(courseDataFormControls, 'course')}

                <SelectInput label={'Quiz list: '} itemPerPageList={QUIZ_LIST} valueSelected={onQuizSelectedHandler} />

                <div className={classes.CreateCourse__Faculty}>
                    <Counter label={'Faculty:'} counterAmountChanged={(operationType) => onCounterAmountChangedHandler(operationType, 'faculty')} />

                    {createFormContent(facultyFormControls, 'faculty')}

                    <Counter label={'Sections:'} counterAmountChanged={(operationType) => onCounterAmountChangedHandler(operationType, 'section')} />

                    {createFormContent(courseContentTitleFormControls, 'section')}
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