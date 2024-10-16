import ActionButton from './actionButton/ActionButton';
import Bell from './actionButton/icons/Bell'
import Message from './actionButton/icons/Message'
import Settings from './actionButton/icons/Settings'
import Help from './actionButton/icons/Help'
import Moon from './actionButton/icons/Moon'

import styles from './Actions.module.css'
import Switcher from './actionButton/Switcher';

const ACTIONS = [
    {path: '/notifications', Icon: Bell},
    {path: '/messages', Icon: Message},
    {path: '/settings', Icon: Settings},
    {path: '/help', Icon: Help},
];

const Actions = () => {

    return (
        <div className={styles['actions-wrapper']}>
            {
            ACTIONS.map((action, index) => (
                <ActionButton key={index} path={action.path} Icon={action.Icon} />
            ))}
            <Switcher />
        </div>
    );
};

export default Actions;