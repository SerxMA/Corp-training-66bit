import axios from 'axios';

const BASE_URL = 'http://localhost:8082';
axios.defaults.withCredentials = true;

export const makeRequest = (config) => {
	config.url = `${BASE_URL}/${config.url}`;

	return axios(config);
};
