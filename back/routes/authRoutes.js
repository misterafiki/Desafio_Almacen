import { Router } from 'express';
import auth_controller from '../controllers/auth_controller.js';

import { existUserByEmail,validateUpdatePassword} from '../middlewares/userMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js'

export const router = Router();

router.post('/login',[existUserByEmail],auth_controller.login);
router.get('/getInfo',[validateJWT],auth_controller.getUserData);
router.put('/updatePassword',[validateJWT,validateUpdatePassword],auth_controller.updateUserPassword);


