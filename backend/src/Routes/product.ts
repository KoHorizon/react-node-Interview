import { Router } from  'express';
import { productControllerDelete, productControllerGet, productControllerGetAll, productControllerPost, productControllerPut } from '../Controllers/products';

export const router = Router();



router.get('/', productControllerGetAll);
router.get('/:id', productControllerGet);

router.post('/', productControllerPost);
router.put('/:id', productControllerPut);
router.delete('/:id', productControllerDelete);