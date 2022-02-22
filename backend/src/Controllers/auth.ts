import { Response, Request} from 'express';
import Config from '../Config';
import * as jwt from 'jsonwebtoken';


export async function authControllerPost(req: Request, res: Response) {
	if (!req.body.password || req.body.password !== Config.password) {
		res.status(400).json({status: 400, data: 'invalid data'});
		return;
	} 
	
	const token = jwt.sign({},Config.jwtSecret);
	res.json({status: 200, data: token});
	
}


