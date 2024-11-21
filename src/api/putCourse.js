import { makeRequest } from './makeRequest';

const URL = 'admin/courses';

export const putCourse = (config) =>
	makeRequest({ method: 'PUT', ...config, url: URL + `/${config.url}` });
