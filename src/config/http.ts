import { API_KEY, API_URL } from '@/utils/constant';
import axios from 'axios';

const http = axios.create({
  baseURL: API_URL + '/v2',
  headers: {
    'content-type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  config.headers['x-api-key'] = API_KEY;
  return config;
});

export default http;
