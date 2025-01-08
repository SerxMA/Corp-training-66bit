import { api } from '../../api';
import {
	getCoursesFailed,
	getCoursesStarted,
	getCoursesSuccess,
} from '../actionCreators/courses';

export const postCourse = (config, page) => {
	return async (dispatch) => {
		try {
			dispatch(getCoursesStarted());
			await api.courses.postCourse(config);
			dispatch(getCourses({ params: { page } }));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
		}
	};
};

export const getCourses = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getCoursesStarted());
			const response = await api.courses.getCourses(config);
			dispatch(getCoursesSuccess(response.data));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
		}
	};
};

export const getAllCoursesUser = (config, page = 0, limit = 18) => {
	return async (dispatch) => {
		try {
			dispatch(getCoursesStarted());
			const response = await api.courses.getAllCoursesUser({
				...config,
				params: { ...config.params, page, limit },
			});
			dispatch(
				getCoursesSuccess({
					content: response.data.content.map((obj) => ({
						...obj.course,
						userCourse: obj.userCourse,
					})),
					totalPages: response.data.totalPages,
				})
			);
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
		}
	};
};

export const getMyCoursesUser = (config, page = 0, limit = 18) => {
	return async (dispatch) => {
		try {
			dispatch(getCoursesStarted());
			const response = await api.courses.getMyCoursesUser({
				...config,
				params: { ...config.params, page, limit },
			});
			dispatch(
				getCoursesSuccess({
					content: response.data.content.map((obj) => ({
						...obj.course,
						userCourse: obj.userCourse,
					})),
					totalPages: response.data.totalPages,
				})
			);
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
		}
	};
};
