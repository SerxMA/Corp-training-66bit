import { makeRequest } from './makeRequest';

const URL = 'admin/members';

export const getMembers = (config) =>
	makeRequest({ method: 'GET', url: URL, ...config });
