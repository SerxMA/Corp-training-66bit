import axios from 'axios';

import { getError } from '../helpers/functions/getError';

const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			window.location.href = '/auth';
		}

		return Promise.reject(error);
	}
);

export const makeRequest = (config) => {
	config.url = `${BASE_URL}/${config.url}`;

	return axios(config).catch((error) => getError(error));
};
