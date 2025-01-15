export const COURSES_ACTIONS = {
	GET_COURSES_SUCCESS: 'GET_COURSES_SUCCESS',
	GET_COURSES_FAILED: 'GET_COURSES_FAILED',
	GET_COURSES_STARTED: 'GET_COURSES_STARTED',
	RESET_COURSES: 'RESET_COURSES',
};

export const getCoursesSuccess = (payload) => {
	return {
		type: COURSES_ACTIONS.GET_COURSES_SUCCESS,
		payload: payload,
	};
};
export const getCoursesFailed = (error) => {
	return {
		type: COURSES_ACTIONS.GET_COURSES_FAILED,
		payload: error,
	};
};

export const getCoursesStarted = () => {
	return {
		type: COURSES_ACTIONS.GET_COURSES_STARTED,
	};
};

export const resetCourses = () => {
	return {
		type: COURSES_ACTIONS.RESET_COURSES,
	};
};
