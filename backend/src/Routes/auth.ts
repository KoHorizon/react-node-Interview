import { Router } from 'express';
import { authControllerPost, authControllerGet } from '../Controllers/auth';

export const router = Router();



router.post('/', authControllerPost);
router.get('/', authControllerGet);
