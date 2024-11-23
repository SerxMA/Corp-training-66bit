export const changeText = (text, limit, func) => {
	const formText = text
		.trimStart()
		.replace('  ', ' ')
		.replace(/[^\w\sА-Яа-яёЁ_,.()-]/g, '');

	if (formText.length <= limit) {
		func(formText);
	}
};
