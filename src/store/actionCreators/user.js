export const USER_ACTIONS = {
	SET_USER: 'SET_USER',
	REMOVE_USER: 'REMOVE_USER',
};

export const setUser = (payload) => {
	return {
		type: USER_ACTIONS.SET_USER,
		payload: { ...payload },
	};
};
export const removeUser = () => {
	return {
		type: USER_ACTIONS.REMOVE_USER,
	};
};
