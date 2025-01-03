import { MY_GROUP_ACTIONS } from '../actionCreators/myGroup.js';

const initialState = {
	myGroup: {},
	isLoading: false,
	isError: false,
	error: '',
};

const myGroupReducer = (state = initialState, action) => {
	switch (action.type) {
		case MY_GROUP_ACTIONS.GET_MY_GROUP_SUCCESS:
			return {
				...state,
				myGroup: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case MY_GROUP_ACTIONS.GET_MY_GROUP_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case MY_GROUP_ACTIONS.GET_MY_GROUP_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case MY_GROUP_ACTIONS.RESET_MY_GROUP:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default myGroupReducer;
