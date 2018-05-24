import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igkey => ingredients[igkey])
        .reduce((sum, el) => sum + el, 0);

        this.setState({purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        let count = this.state.ingredients[type] + 1;
        let updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = count;
        let priceAddition = INGREDIENT_PRICES[type];
        let newPrice = this.state.totalPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] > 0){
            let count = this.state.ingredients[type] - 1;
            let updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = count;
            let priceDeduction = INGREDIENT_PRICES[type];
            let newPrice = this.state.totalPrice - priceDeduction;
            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
            this.updatePurchaseState(updatedIngredients);
        }       
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('You Continue')
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;     
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}/>
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;