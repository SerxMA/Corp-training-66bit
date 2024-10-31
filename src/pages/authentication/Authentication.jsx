import AuthTitle from '../../components/authentication/authTitle/AuthTitle.jsx';
import AuthMain from '../../components/authentication/authMain/AuthMain.jsx';
import styles from './Authentication.module.css';

const Authentication = () => {
	return (
		<div className={styles.wrapper}>
			<AuthTitle />
			<AuthMain />
		</div>
	);
};

export default Authentication;
