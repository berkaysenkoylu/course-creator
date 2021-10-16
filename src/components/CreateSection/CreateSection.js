import React from 'react';

import classes from './CreateSection.module.scss';
import Menu from '../UI/Menu/Menu';
import Button from '../UI/Button/Button';

const SECTION_ELEMENTS = ['Title', 'Paragraph', 'Image Url', 'Video Url', 'Pagebreak'];

const CreateSection = () => {
    const onMenuItemClickedHandler = item => {
        console.log(item);
    }

    return (
        <section className={classes.CreateSection}>
            <header className={classes.CreateSection__Header}>
                <h1>Create a section</h1>
            </header>

            <section className={classes.CreateSection__Body}>
                <div className={classes.CreateSection__Body__FormField}>
                    &nbsp;
                </div>

                <div className={classes.CreateSection__Body__Menu}>
                    <Menu
                        items={SECTION_ELEMENTS}
                        menuItemClicked={onMenuItemClickedHandler} />
                </div>
            </section>

            <div className={classes.CreateSection__Cta}>
                <Button
                    disabled={true}
                >Create</Button>
            </div>
        </section>
    )
}

export default CreateSection;