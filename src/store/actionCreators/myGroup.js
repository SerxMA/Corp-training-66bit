export const MY_GROUP_ACTIONS = {
	GET_MY_GROUP_SUCCESS: 'GET_MY_GROUP_SUCCESS',
	GET_MY_GROUP_FAILED: 'GET_MY_GROUP_FAILED',
	GET_MY_GROUP_STARTED: 'GET_MY_GROUP_STARTED',
	RESET_MY_GROUP: 'RESET_MY_GROUP',
};

export const getMyGroupSuccess = (payload) => {
	return {
		type: MY_GROUP_ACTIONS.GET_MY_GROUP_SUCCESS,
		payload: payload,
	};
};
export const getMyGroupFailed = (error) => {
	return {
		type: MY_GROUP_ACTIONS.GET_MY_GROUP_FAILED,
		payload: error,
	};
};

export const getMyGroupStarted = () => {
	return {
		type: MY_GROUP_ACTIONS.GET_MY_GROUP_STARTED,
	};
};

export const resetMyGroup = () => {
	return {
		type: MY_GROUP_ACTIONS.RESET_MY_GROUP,
	};
};
