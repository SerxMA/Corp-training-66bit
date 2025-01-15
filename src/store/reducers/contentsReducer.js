import { CONTENTS_ACTIONS } from '../actionCreators/contents.js';

const initialState = {
	contents: [],
	isLoading: false,
	isError: false,
	error: '', // По идее не нужен
};

const contentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONTENTS_ACTIONS.GET_CONTENTS_SUCCESS:
			return {
				...state,
				contents: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case CONTENTS_ACTIONS.GET_CONTENTS_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case CONTENTS_ACTIONS.GET_CONTENTS_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case CONTENTS_ACTIONS.RESET_CONTENTS:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default contentsReducer;
