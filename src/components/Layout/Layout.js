import React from 'react';
import classes from './Layout.css'

const layout = (props) => (
    <React.Fragment>
        <div>Toolbar, sidedrawer, backdrop</div>
        <main className={classes.Container}>{props.children}</main>
    </React.Fragment>
);

export default layout;