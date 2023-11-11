import axios from 'axios';

const token = localStorage.getItem('AT');
const val = `Bearer ${token}`;

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 5000,
    headers: {
        'Authorization': val,
        'Content-Type': 'application/json'
    },
    // withCredentials: true
});

export default AxiosInstance;
