import axios from 'axios';


const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default apiInstance;
