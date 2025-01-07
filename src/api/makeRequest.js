import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response &&
			(error.response.status === 401 || error.response.status === 403)
		) {
			window.location.href = '/auth';
		}

		return Promise.reject(error);
	}
);

export const makeRequest = (config) => {
	config.url = `${BASE_URL}/${config.url}`;

	return axios(config);
};
