import { useState } from 'react';

import logo from '../../assets/images/logo.png';
import styles from './Authentication.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import GitLab from '../../UI/svg/gitLab/GitLab.jsx';
import Checkbox from '../../UI/inputs/checkbox/Checkbox.jsx';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';
import LogoGrowIT from '../../UI/svg/logoGrowIT/LogoGrowIT.jsx';

const Authentication = () => {
	const [remember, setRemember] = useState(false);

	const toggleState = () => {
		setRemember((cv) => !cv);
	};

	return (
		<div className={styles['auth-wrapper']}>
			<div className={styles.content}>
				<LogoGrowIT className={styles.logo} />
				{/* <img className={styles.logo} src={logo} alt="Логотиип" /> */}
				<div className={styles['auth-main']}>
					<h4>Авторизация</h4>
					<div className={styles['auth-SSO']}>
						<MainButton
							className={styles.btn}
							type={'light'}
							onClick={() =>
								(window.location.href =
									'http://localhost:8080/oauth2/authorization/gitlab')
							}
						>
							<GitLab />
							Авторизация через GitLab
						</MainButton>
						<MainButton
							className={styles.btn}
							type={'light'}
							onClick={() =>
								(window.location.href =
									'http://localhost:8080/oauth2/authorization/github')
							}
						>
							<GitLab />
							Авторизация через GitHub
						</MainButton>
					</div>
					<div className={styles.remember} onClick={toggleState}>
						<Checkbox state={remember} />
						Запомнить меня
						<Tooltip />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Authentication;
