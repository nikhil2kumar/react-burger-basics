import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let transfomedIngredients = Object.keys(props.ingredients).map(igKeys => {
        return [...Array(props.ingredients[igKeys])].map((_, i) => (
            <BurgerIngredient key={igKeys  + i} type={igKeys} />
        ))
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    
    if(transfomedIngredients.length === 0)
        transfomedIngredients = <p>Please start adding ingredients!!</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfomedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger);