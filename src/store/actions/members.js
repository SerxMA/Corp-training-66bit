import { api } from '../../api';
import {
	getMembersFailed,
	getMembersStarted,
	getMembersSuccess,
} from '../actionCreators/members';

export const getMembers = (config, page = 0, limit = 20) => {
	return async (dispatch) => {
		try {
			dispatch(getMembersStarted());
			const response = await api.members.getMembersAll({
				...config,
				params: { ...config.params, page, limit },
			});
			dispatch(getMembersSuccess(response.data));
		} catch (error) {
			dispatch(getMembersFailed(error.message));
		}
	};
};
