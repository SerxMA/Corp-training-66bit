import { makeRequest } from './makeRequest';

const URL = 'admin/groups';

export const postGroup = (config) =>
	makeRequest({ ...config, method: 'POST', url: URL });

export const getGroups = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });

export const getGroupDedlines = (config) =>
	makeRequest({ ...config, method: 'GET', url: URL + config.url });

export const putGroupUsers = (config) =>
	makeRequest({ method: 'PUT', url: URL + '/users', ...config });

export const putGroupDedlines = (config) =>
	makeRequest({ ...config, method: 'PUT', url: URL + config.url });

export const putGroupMoveUsers = (config) =>
	makeRequest({ ...config, method: 'PUT', url: URL + '/users/move' });

export const putGroupExcludeUsers = (config) =>
	makeRequest({
		...config,
		method: 'PUT',
		url: URL + '/users/exclude',
	});

export const deleteGroup = (config) =>
	makeRequest({ ...config, method: 'DELETE', url: URL + '/' + config.url });
