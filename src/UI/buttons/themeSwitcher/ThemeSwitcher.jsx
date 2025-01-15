import { useEffect } from 'react';

import useTheme from '../../../customHooks/useTheme.js';
import Moon from '../../svg/moon/Moon.jsx';
import styles from './ThemeSwitcher.module.css';
import Sun from '../../svg/sun/Sun.jsx';

const ThemeSwitcher = () => {
	const [theme, setTheme] = useTheme();

	const toggleTheme = () => {
		setTheme((cv) => (cv === 'light' ? 'dark' : 'light'));
	};

	useEffect(
		() =>
			theme === 'dark'
				? document.body.classList.add('dark')
				: document.body.classList.remove('dark'),
		[theme]
	);

	return (
		<button onClick={toggleTheme} className={styles.container}>
			<Moon
				className={`${styles.icon} ${
					theme === 'light' ? styles.show : ''
				}`}
			/>
			<Sun
				className={`${styles.icon} ${
					theme === 'dark' ? styles.show : ''
				}`}
			/>
		</button>
	);
};

export default ThemeSwitcher;
