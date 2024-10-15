import React from 'react';
import styles from './HeaderActions.module.css'
import Avatar from '../avatar/Avatar';

const HeaderActions = () => {
    return (
        <div className={styles['header-actions']}>
            <Avatar />
        </div>
    );
};

export default HeaderActions;