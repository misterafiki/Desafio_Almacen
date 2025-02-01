import { Router } from 'express';
import subject_grups_controller from '../controllers/subject_grups_controller.js';

import { existSubjectById, existTeacherById } from '../middlewares/subjectGrupMiddleware.js';
import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

router.get('/subject/:subjectId/teacher', 
    [validateJWT, esProfe, existSubjectById], 
    subject_grups_controller.getTeacherIdBySubjectId
);

router.get('/teacher/:teacherId', 
    [validateJWT, esProfe, existTeacherById], 
    subject_grups_controller.getTeacherById
);
