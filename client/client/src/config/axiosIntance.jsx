import axios from 'axios';
import { generateTokenFromOld } from '../helpers/generateAccessToken';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    // withCredentials: true
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('AT');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            const oldToken = localStorage.getItem('RT');

            if (oldToken) {
                const tokens = await generateTokenFromOld(oldToken)

                if (tokens)
                    localStorage.setItem('AT', tokens);
            }

            return AxiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
)

export default AxiosInstance;
