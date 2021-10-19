import React, { useState } from 'react';

import classes from './CreateCourseContainer.module.scss';
import CreateCourse from '../../CreateCourse/CreateCourse';
import CreateSection from '../../CreateSection/CreateSection';
import Button from '../../UI/Button/Button';

const CreateCourseContainer = (props) => {
    const [courseData, setCourseData] = useState({});
    const [isCreate, setIsCreate] = useState(true);

    const onCourseCreatedHandler = (createdCourseData) => {
        setCourseData(createdCourseData);

        console.log(createdCourseData);
    }

    const onCourseSectionAddedHandler = (newCourseData) => {
        console.log(newCourseData);
    }

    return (
        <section className={classes.CreateCourseContainer}>
            <div className={classes.CreateCourseContainer__Cta}>
                <Button clicked={() => setIsCreate(prevState => !prevState)}>Toggle</Button>
            </div>

            {isCreate ? <CreateCourse courseCreated={onCourseCreatedHandler} /> :
                <CreateSection courseData={courseData} sectionCreated={onCourseSectionAddedHandler} />}
        </section>
    )
}

export default CreateCourseContainer;