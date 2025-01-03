import { api } from '../../api';
import {
	getUserCourseFailed,
	getUserCourseStarted,
	getUserCourseSuccess,
} from '../actionCreators/userCourse';

export const getUserCourse = (config) => {
	return async (dispatch) => {
		try {
			dispatch(getUserCourseStarted());
			const response = await api.courses.getUserCourseData(config);
			dispatch(getUserCourseSuccess(response.data));
		} catch (error) {
			dispatch(getUserCourseFailed(error.message));
			alert(
				`Статус - ${error.status}\nКод - ${error.code}\nСообщение - "${
					error.response?.data.message || ''
				}"`
			);
		}
	};
};
