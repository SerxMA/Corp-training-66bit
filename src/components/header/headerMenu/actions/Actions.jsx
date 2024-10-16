import React from 'react';
import ActionButton from './actionButton/ActionButton';
import Bell from './actionButton/icons/Bell'
import Message from './actionButton/icons/Message'
import Settings from './actionButton/icons/Settings'
import Help from './actionButton/icons/Help'
import Moon from './actionButton/icons/Moon'

import styles from './Actions.module.css'

const Actions = () => {

    const actions = [
        {path: '/notifications', Icon: Bell},
        {path: '/messages', Icon: Message},
        {path: '/settings', Icon: Settings},
        {path: '/help', Icon: Help},
        {path: '', Icon: Moon},
    ];

    return (
        <div className={styles['actions-wrapper']}>
            {
            actions.map((action, index) => (
                <ActionButton key={index} path={action.path} Icon={action.Icon} />
            ))}
        </div>
    );
};

export default Actions;