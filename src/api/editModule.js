import { makeRequest } from './makeRequest';

const URL = 'admin/modules';

export const editModule = (config) =>
	makeRequest({...config, url: URL+`${config?.url ? config.url : ''}` });
