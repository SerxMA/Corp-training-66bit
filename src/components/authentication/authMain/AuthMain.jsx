import { NavLink } from 'react-router-dom';

import Gitlab from './gitlab/Gitlab.jsx';
import styles from './AuthMain.module.css';

const AuthMain = () => {
	// const location = useLocation();
	// console.log(location.state?.from || '/');

	return (
		<div className={styles['auth-main']}>
			<NavLink
				to="http://localhost:8082/oauth2/authorization/github"
				className={styles['button-auth']}
			>
				<Gitlab /> Авторизация
			</NavLink>

			<label htmlFor="remember_me">
				<input type="checkbox" id="remember_me" />
				<span>Запомнить меня</span>
			</label>
		</div>
	);
};

export default AuthMain;
