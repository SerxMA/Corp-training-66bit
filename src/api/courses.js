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

export const deleteCourse = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({ method: 'DELETE', ...config });
};
