import { config } from 'dotenv';
config();

export default {
	jwtSecret : process.env.JWT_SECRET || '',
	password : process.env.USER_PASSWORD || '',
	port : parseInt(process.env.PORT || '3000',10),

	database: {
		user: process.env.MONGO_USER || '',
		pass: process.env.MONGO_PASSWORD || '',
		host: process.env.MONGO_HOST || '',
		dbName: process.env.MONGO_DATABASE || '',
	}

};