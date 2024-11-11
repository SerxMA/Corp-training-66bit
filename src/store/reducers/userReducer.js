import { USER_ACTIONS } from '../actionCreators/user.js';

const initialState = {
	username: null,
	email: null,
	avatarUrl: null,
	role: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_ACTIONS.SET_USER:
			return {
				...state,
				username: action.payload.username,
				email: action.payload.email,
				role: action.payload.role,
				avatarUrl: action.payload.avatarUrl,
			};

		case USER_ACTIONS.REMOVE_USER:
			return {
				...state,
				...initialState,
			};

		default:
			return { ...state };
	}
};

export default userReducer;
