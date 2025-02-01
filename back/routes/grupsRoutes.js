import { Router } from 'express';
import grups_controller from '../controllers/grups_controller.js';

import { existGrupById } from '../middlewares/grupMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { esTutor } from '../middlewares/validateRoles.js';

export const router = Router();

router.get('/grups', [validateJWT, esTutor], grups_controller.getGrups);

router.post('/grups/tutor', [validateJWT, esTutor], grups_controller.addTutorToGrup);

router.put('/grups/tutor', [validateJWT, esTutor], grups_controller.updateTutorToGrup);

router.delete('/grups/tutor/:grupId', [existGrupById, validateJWT, esTutor], grups_controller.deleteTutorToGrup);

router.post('/grups', [validateJWT, esTutor], grups_controller.addGrup);

router.put('/grups/:grupId', [existGrupById, validateJWT, esTutor], grups_controller.updateGrup);

router.delete('/grups/:grupId', [existGrupById, validateJWT, esTutor], grups_controller.deleteGrup);
