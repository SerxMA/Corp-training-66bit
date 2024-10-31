import Gitlab from './gitlab/Gitlab';
import styles from './AuthMain.module.css';
import { NavLink } from 'react-router-dom';


const AuthMain = () => {

	return (
		<div className={styles['auth-main']}>
			<NavLink
				to="http://localhost:8080/oauth2/authorization/gitlab"
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
