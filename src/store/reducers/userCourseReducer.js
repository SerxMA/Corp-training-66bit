import { USER_COURSE_ACTIONS } from '../actionCreators/userCourse.js';

const initialState = {
	userCourse: {},
	isLoading: false,
	isError: false,
	error: '',
};

const userCourseReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_COURSE_ACTIONS.GET_USER_COURSE_SUCCESS:
			return {
				...state,
				userCourse: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case USER_COURSE_ACTIONS.GET_USER_COURSE_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case USER_COURSE_ACTIONS.GET_USER_COURSE_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case USER_COURSE_ACTIONS.RESET_USER_COURSE:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default userCourseReducer;
