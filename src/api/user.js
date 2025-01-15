import { makeRequest } from './makeRequest';

export const getUser = (config) =>
	makeRequest({ method: 'GET', url: 'userinfo', ...config });

export const removeUser = (config) =>
	makeRequest({ method: 'POST', url: 'logout', ...config });
