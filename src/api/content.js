import { makeRequest } from './makeRequest';

const URL = 'admin/contents';

export const getContent = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });

export const postContentElement = (config) =>
	makeRequest({ ...config, method: 'POST', url: URL });

export const putContentElement = (config) => {
	config.url = URL + `/${config.url}`;
	return makeRequest({ method: 'PUT', ...config });
};

export const deleteContentElement = (config) => {
	config.url = URL + `/${config.url}`;
	return makeRequest({ method: 'DELETE', ...config });
};

const URL_USER = 'user/contents';

export const getContentsUser = (config) =>
	makeRequest({ method: 'GET', url: URL_USER, ...config });

export const postContentsUser = (config) =>
	makeRequest({ ...config, method: 'POST', url: URL_USER });
