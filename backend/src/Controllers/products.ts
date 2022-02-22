import { Response, Request } from 'express';
import { createProducts, deleteProduct, editProduct, findProducts, findProductsById } from '../Database';
import productCreateValidate from '../Validate/product_create';
import productEditValidate from '../Validate/product_edit';



export async function productControllerPost(req: Request, res: Response) {
	try {
		const value = await productCreateValidate.validateAsync(req.body);
		const createdProduct = await createProducts(value);
		res.status(200).send(createdProduct.toJSON());
	}
	catch (err) { 
		res.status(400).send(err);
	}
}

export async function productControllerGetAll(req: Request, res: Response) {
	const product = await findProducts();
	res.send(product.map((item) => item.toJSON()));
}

export async function productControllerGet(req: Request, res: Response) {
	const id = parseInt(req.params.id,10);
	const product = await findProductsById(id);
	if (!product) {
		res.status(404).send('no data');
		return;
	}
	res.send(product.toJSON());
}


export async function productControllerDelete(req: Request, res: Response) {
	const id = parseInt(req.params.id,10);
	if (isNaN(id)) {
		res.status(404).send({status : 400, error: 'the given params is not a number'});
		return;
	}
	const product = await deleteProduct(id);
	console.log(product.deletedCount);
	if (product.deletedCount == 1) {
		res.status(200).send({status : 200, data: 'the documents have been deleted'});
	} else {
		res.status(404).send({status : 404, data: 'No this product don\'t exist in database'});
	}
}

export async function productControllerPut(req: Request, res: Response) {
	const id = parseInt(req.params.id,10);
	if (isNaN(id)) {
		res.status(404).send({status : 400, error: 'the given params is not a number'});
		return;
	}

	try {
		const value = await productEditValidate.validateAsync(req.body);
		await editProduct(id ,value);
		res.status(200).json({status: 200, data: 'The document have been edited'});
	}
	catch (err) { 
		res.status(400).send(err);
	}



}

