import express from 'express';
import router from './Routes';
import jwtexpress from 'express-jwt';
import Config from './Config';




const app = express();
const port = 3000;
app.use(express.json());

app.use(jwtexpress({ secret: Config.jwtSecret, algorithms: ['HS256']}).unless({
	path: ['/auth']
}),	function (err:any, req:any, res:any, next:any) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...');
	}
});


app.use(router);


app.listen(port);