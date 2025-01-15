import Tooltip from '../../other/tooltip/Tooltip.jsx';
import RedEllipse from '../../svg/redEllipse/RedEllipse.jsx';
import styles from './ActionButton.module.css';

const ActionButton = ({
	children = 'button',
	onClick = () => {},
	isNotif,
	inWorking,
}) => {
	return (
		<button
			className={`${styles['action-button']} ${
				inWorking ? styles['in-working'] : ''
			}`}
			onClick={onClick}
		>
			{children}
			{isNotif && <RedEllipse className={styles.ellipse} />}
			{inWorking && <Tooltip />}
		</button>
	);
};

export default ActionButton;
