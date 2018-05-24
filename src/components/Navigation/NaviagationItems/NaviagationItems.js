import React from 'react';

import classes from './NaviagationItems.css';
import NavigationItem from './NaviagationItem/NaviagationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;