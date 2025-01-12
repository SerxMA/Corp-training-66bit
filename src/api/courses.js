import { makeRequest } from './makeRequest';

const URL = 'admin/courses';

export const postCourse = (config) =>
	makeRequest({ method: 'POST', url: URL, ...config });

export const getCourses = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });

export const getCourse = (config) =>
	makeRequest({ method: 'GET', ...config, url: URL + config.url });

export const putCourse = (config) =>
	makeRequest({ method: 'PUT', ...config, url: URL + config.url });

export const putCoursePublish = (config) =>
	makeRequest({
		method: 'PUT',
		...config,
		url: URL + config.url,
	});

export const deleteCourse = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({ method: 'DELETE', ...config });
};

const URL_USER = 'user/courses';

export const postSignUpCourse = (config) =>
	makeRequest({ method: 'POST', url: URL_USER + '/subscribe', ...config });

export const getAllCoursesUser = (config) =>
	makeRequest({ method: 'GET', url: URL_USER, ...config });

export const getMyCoursesUser = (config) =>
	makeRequest({ method: 'GET', url: URL_USER, ...config });

export const getUserCourseData = (config) =>
	makeRequest({ method: 'GET', ...config, url: URL_USER + '/current' });

export const getCourseUser = (config) =>
	makeRequest({ method: 'GET', ...config, url: URL_USER + config.url });
