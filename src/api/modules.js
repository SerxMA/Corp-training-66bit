import { makeRequest } from './makeRequest';

const URL = 'admin/modules';

export const postModule = (config) =>
	makeRequest({ method: 'POST', url: URL, ...config });

export const getModules = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });

export const putModule = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({ method: 'PUT', ...config });
};

export const deleteModule = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({ method: 'DELETE', ...config });
};
