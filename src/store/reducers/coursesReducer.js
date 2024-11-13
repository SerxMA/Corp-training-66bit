import { COURSES_ACTIONS } from '../actionCreators/courses.js';

const initialState = {
	courses: [],
};

const coursesReducer = (state = initialState, action) => {
	switch (action.type) {
		case COURSES_ACTIONS.SET_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload.course],
			};

		case COURSES_ACTIONS.GET_COURSES:
			return {
				...state,
				courses: [...action.payload.courses.content],
			};

		default:
			return { ...state };
	}
};

export default coursesReducer;
