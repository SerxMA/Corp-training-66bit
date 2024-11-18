import { makeRequest } from './makeRequest';

const URL = 'admin/modules';

export const getAllCourseModules = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
