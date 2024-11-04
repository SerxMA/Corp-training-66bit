import { makeRequest } from './makeRequest';

const URL = 'admin/courses';

export const postNewCourse = (config) =>
	makeRequest({ method: 'POST', url: URL, ...config });
