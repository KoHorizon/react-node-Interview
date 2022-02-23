import { Router } from  'express';
import { productControllerDelete, productControllerGet, productControllerGetAll, productControllerPost, productControllerPatch } from '../Controllers/products';

export const router = Router();



router.get('/', productControllerGetAll);
router.get('/:id', productControllerGet);

router.post('/', productControllerPost);
router.patch('/:id', productControllerPatch);
router.delete('/:id', productControllerDelete);