import Products, { Product } from '../Models/products';


export async function createProducts(data: Omit<Product,'_id' | 'rating'>) {

	let id = 1;
	
	const value = await Products.find({},'_id').sort({ _id: -1 }).limit(1).exec();
	if (value.length >  0 ) id = value[0]._id+1; 


	const docs = await Products.create({ 
		_id: id,
		name: data.name, 
		type: data.type,
		price: data.price,
		rating: 0,
		warranty_years: data.warranty_years,
		available: data.available
	});
	await docs.save();
	return docs;
}

export async function findProducts() {
	return await Products.find().exec();
}


export async function findProductsById(id: number) {
	return await Products.findById(id).exec();
}

export async function deleteProduct(id: number) {
	return await Products.deleteOne({ _id: id }).exec();
}

export async function editProduct(id: number, productObject: Omit<Product,'_id' | 'rating' | 'type' > ) {
	return await Products.findOneAndUpdate({_id: id}, productObject, { new: true }).exec();
}