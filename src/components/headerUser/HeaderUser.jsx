import React from 'react';
import styles from './HeaderUser.module.css'
import LogoBlock from '../logoBlock/LogoBlock';
import HeaderActions from '../headerActions/HeaderActions';

const HeaderUser = () => {
    return (
        <div className={styles['header-wrapper']}>
            <LogoBlock/>
            <HeaderActions />
        </div>
    );
};

export default HeaderUser;