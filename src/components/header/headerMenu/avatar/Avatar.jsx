import React from 'react';
import styles from './Avatar.module.css'
import avatar from './Avatar.jpg'

const Avatar = () => {
    return (
        <button className={styles['avatar-btn']}>
            <img src={avatar} alt="Avatar"/>
        </button>
    );
};

export default Avatar;