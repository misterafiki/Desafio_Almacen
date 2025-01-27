import { Router } from 'express';
import auth_controller from '../controllers/auth_controller.js';

import { existUserByEmail} from '../middlewares/userMiddleware.js';

export const router = Router();

router.post('/login',[existUserByEmail],auth_controller.login);


