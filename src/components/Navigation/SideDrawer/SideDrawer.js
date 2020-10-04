import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Aux'

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Close]

    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.close}/> 
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
    );
}

export default sideDrawer;