import axios from 'axios';

const secureApi = axios.create({
    baseURL: 'http://localhost:8000/api', // Your API base URL
    // baseURL: 'https://zit-accounting.hostzam.com/api', // Your API base URL
    // baseURL: 'https://accountingserver.techzaint.com/api', // Your API base URL
    // baseURL: 'https://testaccountingserver.hostzam.com/api', // Your API base URL
    // baseURL: 'https://erpserver.hostzam.com/api', // API base URL
});

// Request interceptor to set common headers
secureApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['Content-Type'] = 'application/json';
    // Add any other common headers if needed
    return config;
});

// Response interceptor to handle errors
secureApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('An error occurred:', error.message);
        return Promise.reject(error);
    }
);

export default secureApi;
