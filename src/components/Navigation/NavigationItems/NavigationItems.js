import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import styles from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (

        <ul className={styles.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem> : null}
            { props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authenticate</NavigationItem> }
        </ul>
    );
}

export default navigationItems;