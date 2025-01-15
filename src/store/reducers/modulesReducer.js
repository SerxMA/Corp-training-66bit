import { MODULES_ACTIONS } from '../actionCreators/modules.js';

const initialState = {
	modules: [],
	isLoading: false,
	isError: false,
	error: '', // По идее не нужен
};

const modulesReducer = (state = initialState, action) => {
	switch (action.type) {
		case MODULES_ACTIONS.GET_MODULES_SUCCESS:
			return {
				...state,
				modules: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case MODULES_ACTIONS.GET_MODULES_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case MODULES_ACTIONS.GET_MODULES_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case MODULES_ACTIONS.RESET_MODULES:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default modulesReducer;
