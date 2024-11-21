import { COURSE_ACTIONS } from '../actionCreators/course';

const initialState = {
	course: {},
	isLoading: false,
	isError: false,
	error: '', // По идее не нужен
};

const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case COURSE_ACTIONS.GET_COURSE_SUCCESS:
			return {
				...state,
				course: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case COURSE_ACTIONS.DELETE_COURSE_SUCCESS:
			return {
				...initialState,
			};

		case COURSE_ACTIONS.GET_COURSE_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case COURSE_ACTIONS.GET_COURSE_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		default:
			return { ...state };
	}
};

export default courseReducer;
