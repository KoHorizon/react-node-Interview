import Joi from 'joi';
import { Product as ProductType } from '../types/product';

type Product = Omit<ProductType, '_id' | 'rating'>

export const ProductSchema = Joi.object<Product>({
	name: Joi.string(),
	type: Joi.string(),
	price: Joi.number(),
	warranty_years: Joi.number(),
	available: Joi.boolean(),
});

export const AddProductSchema = ProductSchema.concat(Joi.object<Product>({
	name: Joi.required(),
	available: Joi.required(),
	price: Joi.required(),
	type: Joi.required(),
	warranty_years: Joi.required(),
}));