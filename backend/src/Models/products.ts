import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface Product {
    _id: number,
	name: string,
	type: string,
	price: number,
	rating: number,
	warranty_years: number,
	available: boolean
}



const productSchema = new Schema<Product>({
	_id: Number,
	name: String,
	type: String,
	price: Number,
	rating: Number,
	warranty_years: Number,
	available: Boolean
});

const Products = mongoose.model<Product>('products', productSchema);

export default Products;