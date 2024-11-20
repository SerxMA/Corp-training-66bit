import { makeRequest } from './makeRequest';

const URL = 'admin/topics';

export const editLesson = (config) =>
	makeRequest({...config, url: URL+`${config?.url ? config.url : ''}` });
