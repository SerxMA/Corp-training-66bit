export const COURSE_ACTIONS = {
	GET_COURSE_SUCCESS: 'GET_COURSE_SUCCESS',
	GET_COURSE_FAILED: 'GET_COURSE_FAILED',
	GET_COURSE_STARTED: 'GET_COURSE_STARTED',
	DELETE_COURSE_SUCCESS: 'DELETE_COURSE_SUCCESS',
};

export const getCourseSuccess = (payload) => {
	return {
		type: COURSE_ACTIONS.GET_COURSE_SUCCESS,
		payload: payload,
	};
};

export const deleteCourseSuccess = (payload) => {
	return {
		type: COURSE_ACTIONS.GET_COURSE_SUCCESS,
		payload: payload,
	};
};

export const getCourseFailed = (error) => {
	return {
		type: COURSE_ACTIONS.GET_COURSE_FAILED,
		payload: error,
	};
};

export const getCourseStarted = () => {
	return {
		type: COURSE_ACTIONS.GET_COURSE_STARTED,
	};
};
