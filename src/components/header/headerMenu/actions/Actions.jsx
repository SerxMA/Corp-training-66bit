import Bell from '../../../../UI/svg/bell/Bell.jsx';
import Message from '../../../../UI/svg/message/Message.jsx';
import Settings from '../../../../UI/svg/settings/Settings.jsx';
import Help from '../../../../UI/svg/help/Help.jsx';
import ActionButton from '../../../../UI/buttons/actionButton/ActionButton.jsx';
import ThemeSwitcher from '../../../../UI/buttons/themeSwitcher/ThemeSwitcher.jsx';
import styles from './Actions.module.css';

const ACTIONS = [
	{
		icon: <Bell size={'medium'} />,
		state: true,
		inWorking: true,
	},
	{ icon: <Message size={'medium'} />, state: false, inWorking: true },
	{ icon: <Settings size={'medium'} />, state: false, inWorking: true },
	{ icon: <Help size={'medium'} />, state: false, inWorking: true },
];

const Actions = () => {
	return (
		<div className={styles['actions-wrapper']}>
			{ACTIONS.map((action, index) => (
				<ActionButton
					key={index}
					isNotif={action.state}
					inWorking={action.inWorking}
				>
					{action.icon}
				</ActionButton>
			))}
			<ThemeSwitcher />
		</div>
	);
};

export default Actions;
