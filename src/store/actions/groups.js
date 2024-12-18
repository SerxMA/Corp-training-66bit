import { api } from '../../api';
import {
	getGroupsFailed,
	getGroupsStarted,
	getGroupsSuccess,
} from '../actionCreators/groups';

export const postGroup = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.postGroup(config);
			dispatch(getGroups({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
export const getGroups = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			const response = await api.groups.getGroups(config);
			dispatch(getGroupsSuccess(response.data));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
export const deleteGroup = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.deleteGroup(config);
			dispatch(getGroups({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
