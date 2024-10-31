import { makeRequest } from './makeRequest';

const URL = 'user/info';

export const getUserRole = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
