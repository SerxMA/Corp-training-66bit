export const convertArrayToDate = (dateArray) => {
	if (dateArray.length < 5) {
		console.error('Invalid date array');
		return null;
	}

	const [year, month, day, hours, minutes] = dateArray;

	return new Date(year, month - 1, day, hours, minutes);
};
