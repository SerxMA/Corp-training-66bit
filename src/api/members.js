import { makeRequest } from './makeRequest';

const URL = 'admin/members';

export const getMembersExclude = (config) =>
	makeRequest({ method: 'GET', url: URL + '/exclude', ...config });
