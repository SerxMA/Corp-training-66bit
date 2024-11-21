import { makeRequest } from './makeRequest';

const URL = 'admin/topics';

export const postLesson = (config) =>
	makeRequest({ method: 'POST', url: URL, ...config });

export const putLesson = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({ method: 'PUT', ...config });
};

export const deleteLesson = (config) => {
	config.url = URL + `${config.url}`;
	return makeRequest({
		method: 'DELETE',
		...config,
	});
};
