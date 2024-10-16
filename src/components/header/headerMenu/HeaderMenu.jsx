import React from 'react';
import styles from './HeaderMenu.module.css'
import Avatar from './avatar/Avatar';
import Actions from './actions/Actions';

const HeaderMenu = () => {
    return (
        <div className={styles['header-actions']}>
            <Avatar />
            <Actions />
        </div>
    );
};

export default HeaderMenu;