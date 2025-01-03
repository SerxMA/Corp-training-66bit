export const USER_COURSE_ACTIONS = {
	GET_USER_COURSE_SUCCESS: 'GET_USER_COURSE_SUCCESS',
	GET_USER_COURSE_FAILED: 'GET_USER_COURSE_FAILED',
	GET_USER_COURSE_STARTED: 'GET_USER_COURSE_STARTED',
	RESET_USER_COURSE: 'RESET_USER_COURSE',
};

export const getUserCourseSuccess = (payload) => {
	return {
		type: USER_COURSE_ACTIONS.GET_USER_COURSE_SUCCESS,
		payload: payload,
	};
};

export const getUserCourseFailed = (error) => {
	return {
		type: USER_COURSE_ACTIONS.GET_USER_COURSE_FAILED,
		payload: error,
	};
};

export const getUserCourseStarted = () => {
	return {
		type: USER_COURSE_ACTIONS.GET_USER_COURSE_STARTED,
	};
};
export const resetUserCourse = () => {
	return {
		type: USER_COURSE_ACTIONS.RESET_USER_COURSE,
	};
};
