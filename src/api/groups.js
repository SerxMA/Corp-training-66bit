import { makeRequest } from './makeRequest';

const URL = 'admin/groups';

export const postGroup = (config) =>
	makeRequest({ ...config, method: 'POST', url: URL });

export const getGroups = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
