import Joi from 'joi';


const schema = Joi.object({
	name: Joi.string()
		.alphanum().min(3).max(30).required(),
	type: Joi.string().required(),
	price: Joi.number().required(),
	rating: Joi.number().required(),
	warranty_years: Joi.number().required(),
	available: Joi.boolean().required()
});

export default schema;