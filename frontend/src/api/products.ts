import { AxiosPromise } from "axios";
import request from '../utils/request';
import { Product } from "../types/product";

export const findAll = (): AxiosPromise<Product> => 
    request({
        url: "/products",
        method: "GET",
    })