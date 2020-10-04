import React from 'react';

import Logo from '../../assets/images/burger-logo.png';

import styles from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={styles.Logo}>
            <img src={Logo} alt="Burger Logo"/>
        </div>
    )
}

export default logo;