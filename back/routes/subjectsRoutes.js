import { Router } from 'express';
import subjects_controller from '../controllers/subjects_controller.js';

import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfesor } from '../middlewares/validateRoles.js';
import { existSubjectById } from '../middlewares/subjectMiddleware.js';

export const router = Router();

// Rutas para asignaturas
router.get('/subjects', [validateJWT], subjects_controller.subjectsGet);

router.get('/subjects/:id', [validateJWT, existSubjectById], subjects_controller.subjectGetById);

router.post('/subjects', [validateJWT, esProfesor], subjects_controller.subjectCreate);

router.put('/subjects/:id', [validateJWT, esProfesor, existSubjectById], subjects_controller.subjectUpdate);

router.delete('/subjects/:id', [validateJWT, esProfesor, existSubjectById], subjects_controller.subjectDelete);

// Rutas para la gestión de profesores en asignaturas
router.post('/subjects/professor', [validateJWT, esProfesor], subjects_controller.addProfessorToSubject);

router.put('/subjects/professor', [validateJWT, esProfesor], subjects_controller.updateProfessorInSubject);

router.delete('/subjects/professor/:subjectId', [validateJWT, esProfesor, existSubjectById], subjects_controller.deleteProfessorFromSubject);
