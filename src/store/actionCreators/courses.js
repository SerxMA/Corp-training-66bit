export const COURSES_ACTIONS = {
	SET_COURSE: 'SET_COURSE',
	GET_COURSES: 'GET_COURSES',
};

export const setCourse = (payload) => {
	return {
		type: COURSES_ACTIONS.SET_COURSE,
		payload: { ...payload },
	};
};

export const getCourses = (payload) => {
	return {
		type: COURSES_ACTIONS.GET_COURSES,
		payload: { ...payload },
	};
};
