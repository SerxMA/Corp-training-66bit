import RedEllipse from '../../svg/redEllipse/RedEllipse.jsx';
import styles from './ActionButton.module.css';

const ActionButton = ({ children = 'button', onClick = () => {}, isNotif }) => {
	return (
		<button className={styles['action-button']} onClick={onClick}>
			{children}
			{isNotif && <RedEllipse className={styles.ellipse} />}
		</button>
	);
};

export default ActionButton;
