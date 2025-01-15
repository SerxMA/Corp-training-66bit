export const GROUPS_ACTIONS = {
	GET_GROUPS_SUCCESS: 'GET_GROUPS_SUCCESS',
	GET_GROUPS_FAILED: 'GET_GROUPS_FAILED',
	GET_GROUPS_STARTED: 'GET_GROUPS_STARTED',
	RESET_GROUPS: 'RESET_GROUPS',
};

export const getGroupsSuccess = (payload) => {
	return {
		type: GROUPS_ACTIONS.GET_GROUPS_SUCCESS,
		payload: payload,
	};
};
export const getGroupsFailed = (error) => {
	return {
		type: GROUPS_ACTIONS.GET_GROUPS_FAILED,
		payload: error,
	};
};

export const getGroupsStarted = () => {
	return {
		type: GROUPS_ACTIONS.GET_GROUPS_STARTED,
	};
};

export const resetGroups = () => {
	return {
		type: GROUPS_ACTIONS.RESET_GROUPS,
	};
};
