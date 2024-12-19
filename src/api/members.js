import { makeRequest } from './makeRequest';

const URL = 'admin/members';

export const getMembersExclude = (config) =>
	makeRequest({ method: 'GET', url: URL + '/groups/current', ...config });

export const getMembersForNewGroup = (config) =>
	makeRequest({ method: 'GET', url: URL + '/groups/new', ...config });

export const getMembersAll = (config) =>
	makeRequest({ method: 'GET', url: URL + '/groups/all', ...config });
