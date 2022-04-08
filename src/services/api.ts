import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = 'http://localhost:3003/';

export default api;
