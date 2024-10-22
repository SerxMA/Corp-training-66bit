import BitLogoMini from './bitLogoMini/BitLogoMini';

import styles from './AuthTitle.module.css';

const AuthTitle = () => {
	return (
		<div className={styles['auth-title']}>
			<BitLogoMini />
			<h2>Добро пожаловать!</h2>
		</div>
	);
};

export default AuthTitle;
