import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        orderNow: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasableState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0;
    }

    orderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({orderNow: true})
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    cancelOrderHandler = () => {
        //close Modal
        this.setState({ orderNow: false });
        // this.props.history.push('/');
    }

    continueOrderHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        // disable less button for ingredients that have value of 0
        // {lettuce: true, bacon: false, ...}
        // true if button should be disabled
        const disabledInfo = {
            ...this.props.ings
        };
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0
        }
        let orderSummary = null;

        // set burger to spinner before ingredients are retrieved from backend
        let burger = this.props.error ? <p>Error retrieving ingredients</p> : <Spinner />
        // once ingredients retreived, render Burger, BuildControls, OrderSummary
        if (this.props.ings) {
            burger = (
                < Aux >
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchasableState(this.props.ings)}
                        ordered={this.orderHandler}
                        isAuth={this.props.isAuthenticated} />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler} />
            );
        }
        
        return (
            <Aux>
                <Modal
                    show={this.state.orderNow}
                    modalClosed={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));