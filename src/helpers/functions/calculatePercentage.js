export const calculatePercentage = (max, current) => {
	if (max === 0) return 0;

	const percentage = (current / max) * 100;
	// const roundedPercentage = Math.round(percentage / 5) * 5;
	return percentage;
};
