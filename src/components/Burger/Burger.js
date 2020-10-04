import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const Burger = (props) => {
    // convert props.ingredients obj into an array to render ingredients
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }
    // console.log(ingredients);
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;