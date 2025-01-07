import { api } from '../../api/index.js';
import {
	getContentsFailed,
	getContentsStarted,
	getContentsSuccess,
} from '../actionCreators/contents.js';
import { getUserCourseSuccess } from '../actionCreators/userCourse.js';

export const postContents = (topicId, config) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			await api.content.postContentElement(config);
			dispatch(getContents(topicId));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};

export const postContentsUser = (config, secondConfig) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			const result = await api.content.postContentsUser(config);
			dispatch(getContentsUser(secondConfig));
			dispatch(getUserCourseSuccess(result.data.course));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};

export const getContents = (topicId) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			const response = await api.content.getContent({
				params: {
					topicId: topicId,
				},
			});
			const sortResponse = structuredClone(response.data).sort(
				(a, b) => a.position - b.position
			);
			dispatch(getContentsSuccess(sortResponse));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};

export const getContentsUser = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			const response = await api.content.getContentsUser(config);
			const sortResponse = structuredClone(
				response.data.map((data) => ({
					...data.content,
					userContent:
						data.userContent !== null
							? {
									...data.userContent,
									answer: data.userContent.answer
										.replace(/^\[/, '')
										.replace(/\]$/, '')
										.split(', '),
							  }
							: data.userContent,
				}))
			).sort((a, b) => a.position - b.position);
			dispatch(getContentsSuccess(sortResponse));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};

export const putContents = (topicId, config) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			await api.content.putContentElement(config);
			dispatch(getContents(topicId));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};

export const deleteContents = (topicId, config) => {
	return async (dispatch) => {
		try {
			dispatch(getContentsStarted());
			await api.content.deleteContentElement(config);
			dispatch(getContents(topicId));
		} catch (error) {
			dispatch(getContentsFailed(error.message));
		}
	};
};
