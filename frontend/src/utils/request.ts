import axios from 'axios';
import { removePrefix } from './rmPrefix';
const baseURL = import.meta.env.VITE_API_BASE_URL;


const prefixWhiteList = [
    '/auth'
];

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

service.interceptors.request.use( function (req) {
    
    if (!req.url) return req;
    const url = removePrefix(req.url,baseURL);
    
    
    if (prefixWhiteList.filter((item) => url.startsWith(item)).length > 0) return req; 
    
    const token = localStorage.getItem('token');
    
    if(!token) return req;
    
    if(!req.headers) req.headers = {};
    
    req.headers.Authorization = `Bearer ${token}`;
    
    return req;
});

export default service;