import { api } from '../../api';
import {
	getModulesFailed,
	getModulesStarted,
	getModulesSuccess,
} from '../actionCreators/modules';

export const postEntity = (type, courseId, config) => {
	const identificationType = {
		module: api.modules.postModule,
		lesson: api.lessons.postLesson,
	};
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			await identificationType[type](config);
			dispatch(getModules(courseId));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const getModules = (courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			const response = await api.modules.getModules({
				params: {
					courseId: courseId,
				},
			});
			const sortResponse = structuredClone(response.data)
				.sort((a, b) => a.position - b.position)
				.map((obj) => ({
					...obj,
					topics: obj.topics
						.slice()
						.sort((a, b) => a.position - b.position),
				}));
			dispatch(getModulesSuccess(sortResponse));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const getModulesUser = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			const response = await api.modules.getModulesUser(config);
			const normalData = response.data.map((obj) => ({
				...obj.module,
				topics: obj.topics,
				deadline: obj.deadline,
				userModule: obj.userModule,
			}));
			const sortResponse = structuredClone(normalData)
				.sort((a, b) => a.position - b.position)
				.map((obj) => ({
					...obj,
					topics: obj.topics
						.map((objTopic) => ({
							...objTopic.topic,
							userTopic: objTopic.userTopic,
						}))
						.slice()
						.sort((a, b) => a.position - b.position),
				}));
			dispatch(getModulesSuccess(sortResponse));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const postCurrentModule = (config, secondConfig) => {
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			await api.modules.postCurrentModule(config);
			dispatch(getModulesUser(secondConfig));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const postCurrentTopic = (config, secondConfig) => {
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			await api.lessons.postCurrentTopic(config);
			dispatch(getModulesUser(secondConfig));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const putEntity = (type, courseId, config) => {
	const identificationType = {
		module: api.modules.putModule,
		lesson: api.lessons.putLesson,
	};
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			await identificationType[type](config);
			dispatch(getModules(courseId));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};

export const deleteEntity = (type, id, courseId) => {
	const identificationType = {
		module: api.modules.deleteModule,
		lesson: api.lessons.deleteLesson,
	};
	return async (dispatch) => {
		try {
			dispatch(getModulesStarted());
			await identificationType[type]({
				url: '/' + id,
			});
			dispatch(getModules(courseId));
		} catch (error) {
			dispatch(getModulesFailed(error.message));
		}
	};
};
