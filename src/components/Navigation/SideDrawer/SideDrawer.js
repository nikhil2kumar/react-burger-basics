import React from 'react';

import classes from './SideDrawer.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NaviagationItems/NaviagationItems';
import BackDrop from './../../UI/Backdrop/Backdrop';

const sideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;