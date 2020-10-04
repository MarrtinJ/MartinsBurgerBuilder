import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

import styles from './Toolbar.module.css'

const toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <div>
                <SideDrawerToggle clicked={props.clicked}/>
            </div>
            <div className={styles.Logo}>
                <Logo />
            </div>
            
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
}

export default toolbar;