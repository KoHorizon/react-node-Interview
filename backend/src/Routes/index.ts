import {router as auth} from './auth';
import {router as products} from './product';

import { Router } from 'express';


const router = Router();
router.use('/auth', auth);
router.use('/products', products);


const baseRoute = Router();
baseRoute.use('/api',router);
export default baseRoute;