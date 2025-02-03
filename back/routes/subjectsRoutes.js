import { Router } from 'express';
import subjects_controller from '../controllers/subjects_controller.js';

import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

// Rutas para asignaturas
router.get('/subjects', [validateJWT], subjects_controller.subjectsGet);

router.get('/subjects/:id', [validateJWT], subjects_controller.subjectGetById);

router.post('/subjects', [validateJWT, esProfe], subjects_controller.subjectCreate);

router.put('/subjects/:id', [validateJWT, esProfe], subjects_controller.subjectUpdate);

router.delete('/subjects/:id', [validateJWT, esProfe], subjects_controller.subjectDelete);

// Rutas para la gestión de Profes en asignaturas
router.post('/subjects/professor', [validateJWT, esProfe], subjects_controller.addProfessorToSubject);

router.put('/subjects/professor', [validateJWT, esProfe], subjects_controller.updateProfessorInSubject);

router.delete('/subjects/professor/:subjectId', [validateJWT, esProfe], subjects_controller.deleteProfessorFromSubject);
