import ActionButton from './components/actionButton/ActionButton';
import Bell from './icons/Bell';
import Message from './icons/Message';
import Settings from './icons/Settings';
import Help from './icons/Help';

import styles from './Actions.module.css';
import Switcher from './components/switcher/Switcher';

const ACTIONS = [
	{ path: '/notifications', Icon: Bell },
	{ path: '/messages', Icon: Message },
	{ path: '/settings', Icon: Settings },
	{ path: '/help', Icon: Help },
];

const Actions = () => {
	return (
		<div className={styles['actions-wrapper']}>
			{ACTIONS.map((action, index) => (
				<ActionButton
					key={index}
					path={action.path}
					Icon={action.Icon}
				/>
			))}
			<Switcher />
		</div>
	);
};

export default Actions;
