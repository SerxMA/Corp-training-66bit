import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export const makeRequest = (config) => {
	config.url = `${BASE_URL}/${config.url}`;

	return axios(config);
};
