import { useState, useEffect } from 'react';

const detectColorMode = () => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
		return 'dark';
	return 'light';
};

const getStorageThemeValue = () => {
	const savedTheme = localStorage.getItem('theme');
	const initial = JSON.parse(savedTheme);
	return initial || detectColorMode();
};

const useTheme = () => {
	const [theme, setTheme] = useState(() => {
		return getStorageThemeValue();
	});

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme));
	}, [theme]);

	return [theme, setTheme];
};

export default useTheme;
