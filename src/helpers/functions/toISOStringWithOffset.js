export const toISOStringWithOffset = (date) => {
	const offsetMs = date.getTimezoneOffset() * 60 * 1000;
	const localTime = new Date(date.getTime() - offsetMs);
	return localTime.toISOString().slice(0, -1);
};
