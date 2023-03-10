import axios from 'axios';

const Axios = axios.create({
    baseURL: "http://localhost:5000"
})

Axios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')//bu null qaytarir yeni menasizdi yazi,arasdir
    // console.log( window.localStorage.getItem('token')); 
    return config
})

export { Axios }