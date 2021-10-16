import React, { useState } from 'react';

import classes from './CreateCourseContainer.module.scss';
import CreateCourse from '../../CreateCourse/CreateCourse';
import CreateSection from '../../CreateSection/CreateSection';
import Button from '../../UI/Button/Button';

const CreateCourseContainer = (props) => {
    const [isCreate, setIsCreate] = useState(true);

    return (
        <section className={classes.CreateCourseContainer}>
            <div className={classes.CreateCourseContainer__Cta}>
                <Button clicked={() => setIsCreate(prevState => !prevState)}>Toggle</Button>
            </div>

            {isCreate ? <CreateCourse /> : <CreateSection />}
        </section>
    )
}

export default CreateCourseContainer;