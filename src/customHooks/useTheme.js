import { useState, useEffect } from 'react';

const detectColorMode = () => {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
		return 'dark';
	return 'light';
};

const getStorageValue = () => {
	const saved = localStorage.getItem('theme');
	const initial = JSON.parse(saved);
	return initial || detectColorMode();
};

const useTheme = () => {
	const [value, setValue] = useState(() => {
		return getStorageValue();
	});

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useTheme;
