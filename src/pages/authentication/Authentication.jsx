import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Authentication.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import GitLab from '../../UI/svg/gitLab/GitLab.jsx';
// import Checkbox from '../../UI/inputs/checkbox/Checkbox.jsx';
// import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';
import LogoGrowIT from '../../UI/svg/logoGrowIT/LogoGrowIT.jsx';
import useTheme from '../../customHooks/useTheme.js';

const Authentication = () => {
	const [theme, setTheme] = useTheme();
	const [searchParams] = useSearchParams();
	const error = searchParams.get('error') ? searchParams.get('error') : '';
	// const [remember, setRemember] = useState(false);

	// const toggleState = () => {
	// 	setRemember((cv) => !cv);
	// };
	if (error.length) {
		toast.error(error);
	}

	useEffect(
		() =>
			theme === 'dark'
				? document.body.classList.add('dark')
				: document.body.classList.remove('dark'),
		[theme]
	);
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
									import.meta.env.VITE_BASE_URL +
									'/oauth2/authorization/gitlab')
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
									import.meta.env.VITE_BASE_URL +
									'/oauth2/authorization/github')
							}
						>
							<GitLab />
							Авторизация через GitHub
						</MainButton>
					</div>
					{/* <div className={styles.remember} onClick={toggleState}>
						<Checkbox state={remember} />
						Запомнить меня
						<Tooltip />
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Authentication;
