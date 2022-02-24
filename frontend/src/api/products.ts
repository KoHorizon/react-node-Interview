import { AxiosPromise } from 'axios';
import request from '../utils/request';
import { Product } from '../types/product';

export const findAll = (): AxiosPromise<Product[]> => 
    request({
        url: '/products',
        method: 'GET',
    });


export const updateProduct = (id: number,data: Omit<Product,'_id' | 'rating' | 'type'> ): AxiosPromise<Product> =>
    request({
        url: `/products/${id}`,
        method: 'PATCH',
        data
    });


export const deleteProduct = (id: number): AxiosPromise<Product> => 
    request({
        url: `/products/${id}`,
        method: 'DELETE'
    });


export const createProduct = (data: Omit<Product, '_id' | 'rating' >): AxiosPromise<Product> => 
    request({
        url: '/products/',
        method: 'POST',
        data
    });