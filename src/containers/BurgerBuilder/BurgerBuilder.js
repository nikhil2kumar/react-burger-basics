import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    'meat': 0.3,
    'cheese': 0.5,
    'salad': 0.4,
    'bacon': 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-9f2be.firebaseio.com/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        }).catch(err => this.setState({error: true}))
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => ingredients[igkey])
            .reduce((sum, el) => sum + el, 0);

        this.setState({ purchasable: sum > 0 })
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
        if (this.state.ingredients[type] > 0) {
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'Test Street',
                    zipCode: '12375',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            delieveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(res => this.setState({ loading: false, purchasing: false }))
            .catch(err => this.setState({ loading: false, purchasing: false }));
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (<React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </React.Fragment>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);