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
			dispatch(getCourses(page));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};

export const getCourses = (page = 0, limit = 18) => {
	return async (dispatch) => {
		try {
			dispatch(getCoursesStarted());
			const response = await api.courses.getCourses({
				params: { page, limit },
			});
			dispatch(getCoursesSuccess(response.data));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
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
			dispatch(getCoursesSuccess(response.data));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
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
			dispatch(getCoursesSuccess(response.data));
		} catch (error) {
			dispatch(getCoursesFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
