import { makeRequest } from './makeRequest';

const URL = 'admin/courses';

export const getCourse = (config) =>
	makeRequest({ method: 'GET', ...config, url: URL+config.url });
