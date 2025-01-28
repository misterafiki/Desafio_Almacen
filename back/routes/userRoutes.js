import { Router } from 'express';
import users_controller from '../controllers/users_controller.js';

import {existUserById, validateUser} from '../middlewares/userMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

router.get('/', [validateJWT,validateUser], users_controller.getUsers);
router.get('/:id?', [validateJWT,validateUser], users_controller.getUserById);
router.post('/create', [validateJWT,validateUser], users_controller.createUser);
router.put('/update/:id', [validateJWT, existUserById], users_controller.updateUser);
router.delete('/delete/:id',[existUserById,validateJWT,esProfe],users_controller.deleteUser);

