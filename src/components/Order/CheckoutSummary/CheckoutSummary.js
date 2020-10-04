import React from 'react';
// import { NavLink } from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Order Summary</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    );
}

export default checkoutSummary;