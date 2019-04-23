import axios from 'axios';

import config from '../../config';

const instance = axios.create({
  baseURL: config.apiEndpoint,
});

// Add a response interceptor
instance.interceptors.response.use(response => response.data, error => Promise.reject(error));

export default instance;
