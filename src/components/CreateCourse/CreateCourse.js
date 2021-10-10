import React, { useState } from 'react';

import classes from './CreateCourse.module.scss';
import Input from '../UI/Input/Input';
import CreateCourseLanding from './CreateCourseLanding/CreateCourseLanding';

const CreateCourse = () => {
    const [courseNameData, setCourseNameData] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Course Title'
        },
        label: "Course Title",
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [courseData, setCourseData] = useState({
        landing: {
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
            },
            faculty: []
        },
        introduction: {
            elementType: 'textarea',
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
        quiz: '',
        weeks: []
    });

    const onNameInputChanged = (event) => {
        console.log(event.target.value)
    }

    return (
        <section className={classes.CreateCourse}>
            <header className={classes.CreateCourse__Header}>
                <h1>Create a course</h1>
            </header>

            <section className={classes.CreateCourse__Body}>
                <Input
                    elementType={courseNameData.elementType}
                    elementConfig={courseNameData.elementConfig}
                    label={courseNameData.label}
                    value={courseNameData.value}
                    touched={courseNameData.touched}
                    isValid={courseNameData.isValid}
                    changed={(event) => onNameInputChanged(event)} />

                <CreateCourseLanding />
            </section>
        </section>
    )
}

export default CreateCourse;