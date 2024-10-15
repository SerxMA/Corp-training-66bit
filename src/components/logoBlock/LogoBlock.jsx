import React from 'react';
import styles from './LogoBlock.module.css'
import BitLogo from '../bitLogo/BitLogo';

const LogoBlock = () => {
    return (
        <div className={styles['logo-block']}>
            <BitLogo/>
        </div>
    );
};

export default LogoBlock;