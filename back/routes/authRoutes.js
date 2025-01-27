import { Router } from 'express';
import authController from '../controllers/authController.js';

import { existUser,validateUser,validateEmailUnique } from '../middlewares/userMiddleware.js';

export const router = Router();

router.post('/register',[validateUser,validateEmailUnique],authController.register);
router.post('/login',[existUser],authController.login);


