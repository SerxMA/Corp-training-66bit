import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const makeRequest = (config) => {
	config.url = `${BASE_URL}/${config.url}`;

	return axios(config);
};
