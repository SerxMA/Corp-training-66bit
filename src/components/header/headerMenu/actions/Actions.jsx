import ActionButton from './actionButton/ActionButton.jsx';
import Bell from './actionButton/icons/Bell.jsx'
import Message from './actionButton/icons/Message.jsx'
import Settings from './actionButton/icons/Settings.jsx'
import Help from './actionButton/icons/Help.jsx'
import Switcher from './themeSwitcher/ThemeSwitcher.jsx';
import styles from './Actions.module.css'

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