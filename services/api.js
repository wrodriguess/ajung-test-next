import axios from 'axios';

const api = axios.create({
    baseURL: 'https://asia.ajung.site/api'
});

export default api;