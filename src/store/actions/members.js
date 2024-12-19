import { api } from '../../api';
import {
	getMembersFailed,
	getMembersStarted,
	getMembersSuccess,
} from '../actionCreators/members';

export const getMembers = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getMembersStarted());
			const response = await api.members.getMembersAll(config);
			dispatch(getMembersSuccess(response.data.content));
		} catch (error) {
			dispatch(getMembersFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
