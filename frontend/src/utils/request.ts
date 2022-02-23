import axios from "axios";
import { removePrefix } from './rmPrefix';
const baseURL = "http://localhost:3001/api";


const prefixWhiteList = [
    '/auth'
];

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

service.interceptors.request.use( function (config) {
    
    if (!config.url) return config;
    const url = removePrefix(config.url,baseURL);
    
    console.log(config);
    
    if (prefixWhiteList.filter((item) => url.startsWith(item)).length > 0) return config; 
    
    const token = localStorage.getItem('token');
    
    if(!token) return config;
    
    if(!config.headers) config.headers = {};
    
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
});

export default service;