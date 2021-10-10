import classes from './App.module.scss';

import CreateCourseContainer from './components/containers/CreateCourseContainer/CreateCourseContainer';

function App() {
    const onCourseDataSentHandler = (courseData) => {
        console.log(courseData);
    }

    return (
        <div className={classes.App}>
            <CreateCourseContainer courseDataSent={onCourseDataSentHandler} />
        </div>
    );
}

export default App;