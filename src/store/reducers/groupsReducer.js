import { GROUPS_ACTIONS } from '../actionCreators/groups';

const initialState = {
	groups: [],
	isLoading: false,
	isError: false,
	error: '',
};

const groupsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GROUPS_ACTIONS.GET_GROUPS_SUCCESS:
			return {
				...state,
				groups: action.payload,
				isLoading: false,
				isError: false,
				error: '',
			};

		case GROUPS_ACTIONS.GET_GROUPS_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case GROUPS_ACTIONS.GET_GROUPS_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case GROUPS_ACTIONS.RESET_GROUPS:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default groupsReducer;
