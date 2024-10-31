import { makeRequest } from './makeRequest';

const URL = 'userinfo';

export const getUserRole = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
