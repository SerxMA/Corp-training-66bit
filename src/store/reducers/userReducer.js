import { SET_USER } from '../actions/userActions.js';

const initialState = {
	username: null,
	email: null,
	avatarUrl: null,
	role: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				username: action.payload.username,
				email: action.payload.email,
				role: action.payload.role,
				avatarUrl: action.payload.avatarUrl,
			};

		default:
			return { ...state };
	}
};

export default userReducer;
