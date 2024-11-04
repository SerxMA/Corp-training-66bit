export const USER_ACTIONS = {
	SET_USER: 'SET_USER'
}

export const setUser = (payload) => {
	return {
		type: USER_ACTIONS.SET_USER,
		payload: { ...payload },
	};
};
