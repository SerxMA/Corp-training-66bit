import { makeRequest } from './makeRequest';

const URL = 'admin';

export const deleteEntity = (config) =>
	makeRequest({ method: 'DELETE', ...config, url: URL+`${config.url}` });
