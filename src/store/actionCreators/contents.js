export const CONTENTS_ACTIONS = {
	GET_CONTENTS_SUCCESS: 'GET_CONTENTS_SUCCESS',
	GET_CONTENTS_FAILED: 'GET_CONTENTS_FAILED',
	GET_CONTENTS_STARTED: 'GET_CONTENTS_STARTED',
	RESET_CONTENTS: 'RESET_CONTENTS',
};

export const getContentsSuccess = (payload) => {
	return {
		type: CONTENTS_ACTIONS.GET_CONTENTS_SUCCESS,
		payload: payload,
	};
};

export const getContentsFailed = (error) => {
	return {
		type: CONTENTS_ACTIONS.GET_CONTENTS_FAILED,
		payload: error,
	};
};

export const getContentsStarted = () => {
	return {
		type: CONTENTS_ACTIONS.GET_CONTENTS_STARTED,
	};
};

export const resetContents = () => {
	return {
		type: CONTENTS_ACTIONS.RESET_CONTENTS,
	};
};
