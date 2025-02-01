import { Router } from 'express';
import users_controller from '../controllers/users_controller.js';

import {existUserByEmail, existUserById, validateUser} from '../middlewares/userMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

router.get('/', [validateJWT], users_controller.getUsers);
router.get('/:id?', [validateJWT], users_controller.getUserById);
router.post('/create', [validateJWT], users_controller.createUser);
router.put('/update/:id', [validateJWT, existUserById], users_controller.updateUser);
router.delete('/delete/:id',[existUserById,validateJWT,esProfe],users_controller.deleteUser);
router.get('/forgot/:email', users_controller.recoverUser)

