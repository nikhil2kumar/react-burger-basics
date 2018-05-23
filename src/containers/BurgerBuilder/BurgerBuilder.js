import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    'meat': 0.3,
    'cheese': 0.5,
    'salad': 0.4,
    'bacon': 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            'meat': 0,
            'cheese': 0,
            'salad': 0,
            'bacon': 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type] + 1;
        let updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = count;
        let priceAddition = INGREDIENT_PRICES[type];
        let newPrice = this.state.totalPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;