import axios from 'axios';


const httpClient = axios.create({
    baseURL: 'https://dev.api.cloud-atlas.online/',
    headers: {
        'Content-Type': 'application/json',
        'account': '8b59a775077536f3b73bb774655b94f6',
    },
});

export const setToken = (token) => {
    httpClient.defaults.headers.Authorization = `${token}`;
};

export const deleteToken = () => {
    httpClient.defaults.headers.Authorization = '';
};


export default httpClient;
