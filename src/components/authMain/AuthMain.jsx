import React from 'react';
import Gitlab from '../gitlab/Gitlab';
import styles from './AuthMain.module.css'

const AuthMain = () => {
    return (
        <div>
            <button><Gitlab/> Авторизация</button>
            <label htmlFor="remember_me">
                <input type="checkbox" name="" id="remember_me" />
                <span> Запомнить меня</span>
            </label>
        </div>
    );
};

export default AuthMain;