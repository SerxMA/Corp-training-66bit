export const MODULES_ACTIONS = {
	GET_MODULES_SUCCESS: 'GET_MODULES_SUCCESS',
	GET_MODULES_FAILED: 'GET_MODULES_FAILED',
	GET_MODULES_STARTED: 'GET_MODULES_STARTED',
};

export const getModulesSuccess = (payload) => {
	return {
		type: MODULES_ACTIONS.GET_MODULES_SUCCESS,
		payload: payload,
	};
};

export const getModulesFailed = (error) => {
	return {
		type: MODULES_ACTIONS.GET_MODULES_FAILED,
		payload: error,
	};
};

export const getModulesStarted = () => {
	return {
		type: MODULES_ACTIONS.GET_MODULES_STARTED,
	};
};
