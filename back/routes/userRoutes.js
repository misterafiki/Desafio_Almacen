import { Router } from 'express';
import users_controller from '../controllers/users_controller.js';

import { existUserById} from '../middlewares/userMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

router.delete('/delete/:id',[existUserById,validateJWT,esProfe],users_controller.usuariosDelete);


