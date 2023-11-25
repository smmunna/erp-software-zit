import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8000/api', // API base URL
    // baseURL: 'https://zit-accounting.hostzam.com/api', // API base URL
    baseURL: 'https://accountingserver.techzaint.com/api', // API base URL
    // baseURL: 'https://testaccountingserver.hostzam.com/api', // API base URL
    // baseURL: 'https://erpserver.hostzam.com/api', // API base URL
});

// Request interceptor to set common headers
api.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    // Add any other common headers if needed
    return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);

export default api;
