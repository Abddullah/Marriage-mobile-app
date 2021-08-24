import AsyncStorage from '@react-native-community/async-storage';
import {variables} from '../constants/variables';
//export const baseUrl =  'http://clyckitprod.canadacentral.cloudapp.azure.com:8000/api'
// export const baseUrl = 'https://auston.fekracomputers.net/api';

const axios = require('axios');
export const service = axios.create({
    baseURL: variables.baseUrl,
    timeout: 10000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Response intercepter
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.log('error');
        console.log(error);
        console.log('error.............................................');

        let message = '';
        if (error.response) {
            message = error.response.data.message;
        } else if (error.request) {
            message = 'Something went wrong, try again';
        } else {
            message = error.message;
        }
        return Promise.reject(message);
    },
);
