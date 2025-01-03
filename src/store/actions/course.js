import { api } from '../../api';
import {
	deleteCourseSuccess,
	getCourseFailed,
	getCourseStarted,
	getCourseSuccess,
} from '../actionCreators/course';
import { getMyGroupSuccess } from '../actionCreators/myGroup';

export const getCourse = (courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getCourseStarted());
			const response = await api.courses.getCourse({
				url: '/' + courseId,
			});
			dispatch(getCourseSuccess(response.data));
		} catch (error) {
			dispatch(getCourseFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
export const getCourseUser = (config, userCourseid) => {
	return async (dispatch) => {
		try {
			dispatch(getCourseStarted());
			const response = await api.courses.getCourseUser({
				...config,
				url: '/' + userCourseid,
			});
			dispatch(getCourseSuccess(response.data.course));
			dispatch(getMyGroupSuccess(response.data.group));
		} catch (error) {
			dispatch(getCourseFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
export const putCourse = (courseId, config, fieldType) => {
	return async (dispatch) => {
		try {
			dispatch(getCourseStarted());
			await api.courses.putCourse({
				...config,
				url: `/${courseId}/${fieldType}`,
			});
			dispatch(getCourse(courseId));
		} catch (error) {
			dispatch(getCourseFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
export const deleteCourse = (courseId) => {
	return async (dispatch) => {
		try {
			dispatch(getCourseStarted());
			await api.courses.deleteCourse({
				url: '/' + courseId,
			});
			dispatch(deleteCourseSuccess());
		} catch (error) {
			dispatch(getCourseFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
