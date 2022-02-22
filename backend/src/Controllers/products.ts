import { Response, Request } from 'express';



export async function productControllerPost(req: Request, res: Response) {
	console.log('product post');
	console.log(req.body);
	// console.log(req.body.name);
	// console.log(req.body.type);
	// console.log(req.body.price);
	// console.log(req.body.rating);
	// console.log(req.body.warranty_years);
	// console.log(req.body.available);

}

export async function productControllerGetAll(req: Request, res: Response) {
	console.log('product get All');
}

export async function productControllerGet(req: Request, res: Response) {
	console.log('product get');
}


export async function productControllerDelete(req: Request, res: Response) {
	console.log('product delete');
}

export async function productControllerPut(req: Request, res: Response) {
	console.log('product put');
}

