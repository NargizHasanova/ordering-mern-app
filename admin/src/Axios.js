import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:5000/api"
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export { Axios }