import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// export const makeRequest = (config) => {
//     config.url = `${BASE_URL}/${config.url}`
//     axios.defaults.withCredentials = true
//     return axios(config);
// }

export const getUserRole = () => {
    return axios.get(`${BASE_URL}/user/info`, { withCredentials: true })
      .then((response) => {
        return response.data.role;
      })
      .catch((error) => {
        console.log(error);
      });
  };