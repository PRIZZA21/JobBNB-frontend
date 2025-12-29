import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to attach JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor to handle errors globally
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        // Optional: clear local storage if token is invalid
        // localStorage.removeItem('token');
    }
    return Promise.reject(error);
});

export default api;
