import { makeRequest } from './makeRequest';

const URL = 'userinfo';

export const getUser = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
