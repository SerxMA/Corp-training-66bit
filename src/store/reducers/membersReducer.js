import { MEMBERS_ACTIONS } from '../actionCreators/members';

const initialState = {
	members: [],
	totalPages: 1,
	isLoading: false,
	isError: false,
	error: '',
};

const membersReducer = (state = initialState, action) => {
	switch (action.type) {
		case MEMBERS_ACTIONS.GET_MEMBERS_SUCCESS:
			return {
				...state,
				members: action.payload.content,
				totalPages: action.payload.totalPages,
				isLoading: false,
				isError: false,
				error: '',
			};

		case MEMBERS_ACTIONS.GET_MEMBERS_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};

		case MEMBERS_ACTIONS.GET_MEMBERS_STARTED:
			return {
				...state,
				isLoading: true,
				isError: false,
				error: '',
			};

		case MEMBERS_ACTIONS.RESET_MEMBERS:
			return {
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default membersReducer;
