import React from 'react';

import MenuItem from './MenuItem/MenuItem';

const Menu = (props) => {
    let content = props.items.map((item, i) => {
        return <MenuItem
            key={i}
            label={item}
            clicked={() => props.menuItemClicked(item)}
        />;
    });
    return (
        <>
            {content}
        </>
    )
}

export default Menu;