import AuthTitle from '../../components/authTitle/AuthTitle';
import AuthMain from '../../components/authMain/AuthMain';

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
