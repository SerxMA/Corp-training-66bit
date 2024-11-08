import { makeRequest } from './makeRequest';

const URL = 'admin/courses';

export const getAllCourses = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
