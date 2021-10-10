import React from 'react';

import classes from './CreateCourseContainer.module.scss';
import CreateCourse from '../../CreateCourse/CreateCourse';

const CreateCourseContainer = (props) => {
    return (
        <section className={classes.CreateCourseContainer}>
            <CreateCourse />
        </section>
    )
}

export default CreateCourseContainer;