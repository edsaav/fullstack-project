import axios from 'axios';
import * as Cookies from 'js-cookie';

// Sets up a default instance of axios which is
// preconfigured with the necessary URL and headers

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.defaults.headers['Content-Type'] = 'application/json'
api.defaults.headers['Accept'] = 'application/json'

if (!!Cookies.get('auth')) {
  api.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('auth')}`;
}

export default api;
