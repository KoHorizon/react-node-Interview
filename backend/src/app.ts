import express , { Request, Response, NextFunction}from 'express';
import router from './Routes';
import jwtexpress from 'express-jwt';
import Config from './Config';
import cors from 'cors';
import mongoose from 'mongoose';


mongoose.connect(Config.database.host, {
	pass: Config.database.pass,
	user: Config.database.user,
	dbName: Config.database.dbName
});


const app = express();
app.use(cors());
const port = Config.port;
app.use(express.json());

app.use(jwtexpress({ secret: Config.jwtSecret, algorithms: ['HS256']}).unless({
	path: ['/api/auth']
}),	function (err: Error, req: Request, res: Response, next: NextFunction) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...');
		return;
	}
	next();
});

app.use(router);

app.listen(port);