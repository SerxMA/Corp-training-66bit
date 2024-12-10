import { api } from '../../api';
import {
	deleteCourseSuccess,
	getCourseFailed,
	getCourseStarted,
	getCourseSuccess,
} from '../actionCreators/course';

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
