import { COURSES_ACTIONS } from '../actionCreators/courses.js';

const initialState = {
	courses: [],
	totalPages: 1,
	isLoading: false,
	isError: false,
	error: '',
};

const coursesReducer = (state = initialState, action) => {
	switch (action.type) {
		case COURSES_ACTIONS.GET_COURSES_SUCCESS:
			return {
				...state,
				courses: action.payload.content,
				totalPages: action.payload.totalPages,
				isLoading: false,
				isError: false,
				error: '',
			};

		case COURSES_ACTIONS.GET_COURSES_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case COURSES_ACTIONS.GET_COURSES_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case COURSES_ACTIONS.RESET_COURSES:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default coursesReducer;
