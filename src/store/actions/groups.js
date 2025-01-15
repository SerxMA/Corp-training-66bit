import { api } from '../../api';
import {
	getGroupsFailed,
	getGroupsStarted,
	getGroupsSuccess,
} from '../actionCreators/groups';
import { getMembers } from './members';

export const postGroup = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.postGroup(config);
			dispatch(getGroups({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const getGroups = (config, page = 0, limit = 20) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			const response = await api.groups.getGroups({
				...config,
				params: { ...config.params, page, limit },
			});
			dispatch(getGroupsSuccess(response.data));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const putGroupUsers = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.putGroupUsers(config);
			dispatch(getGroups({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const putGroupUsersFromUsersPage = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.putGroupUsers(config);
			dispatch(getMembers({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const putGroupDeadlines = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.putGroupDedlines(config);
			dispatch(getGroups({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const putGroupMoveUsers = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.putGroupMoveUsers(config);
			dispatch(getMembers({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
		}
	};
};
export const putGroupExcludeUsers = (config, courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getGroupsStarted());
			await api.groups.putGroupExcludeUsers(config);
			dispatch(getMembers({ params: { courseId } }));
		} catch (error) {
			dispatch(getGroupsFailed(error.message));
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
		}
	};
};
