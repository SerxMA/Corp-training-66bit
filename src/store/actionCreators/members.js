export const MEMBERS_ACTIONS = {
	GET_MEMBERS_SUCCESS: 'GET_MEMBERS_SUCCESS',
	GET_MEMBERS_FAILED: 'GET_MEMBERS_FAILED',
	GET_MEMBERS_STARTED: 'GET_MEMBERS_STARTED',
	RESET_MEMBERS: 'RESET_MEMBERS',
};

export const getMembersSuccess = (payload) => {
	return {
		type: MEMBERS_ACTIONS.GET_MEMBERS_SUCCESS,
		payload: payload,
	};
};
export const getMembersFailed = (error) => {
	return {
		type: MEMBERS_ACTIONS.GET_MEMBERS_FAILED,
		payload: error,
	};
};

export const getMembersStarted = () => {
	return {
		type: MEMBERS_ACTIONS.GET_MEMBERS_STARTED,
	};
};

export const resetMembers = () => {
	return {
		type: MEMBERS_ACTIONS.RESET_MEMBERS,
	};
};
