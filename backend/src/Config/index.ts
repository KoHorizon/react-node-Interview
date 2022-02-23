import { config } from 'dotenv';
config();

export default {
	jwtSecret : process.env.MY_SECRET_PASS || '',
	password : process.env.PASSWORD || '',
	port : parseInt(process.env.PORT || '3000',10)
};