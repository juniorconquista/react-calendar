import axios from 'axios';
import { API_URL } from './constants';

const instance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        config.url = `${API_URL}${config.url}`;
        return config;
    },
    error => Promise.reject(error),
);

instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

export default instance;
