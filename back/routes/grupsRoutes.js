import { Router } from 'express';
import grups_controller from '../controllers/grups_controller.js';

import { validateJWT } from '../middlewares/validateJWT.js';
import { esProfe } from '../middlewares/validateRoles.js';

export const router = Router();

router.get('/grups', 
   // [validateJWT, esProfe],
     grups_controller.getGrups);

router.post('/grups/tutor',
  // [validateJWT, esProfe], 
   grups_controller.addTutorToGrup);

router.put('/grups/tutor',
//   [validateJWT, esProfe], 
   grups_controller.updateTutorToGrup);

router.delete('/grups/tutor/:grupId',
//[ validateJWT, esProfe], 
   grups_controller.deleteTutorToGrup);

router.post('/grups', 
 // [validateJWT, esProfe],
   grups_controller.addGrup);

router.put('/grups/:grupId',
 //  [ validateJWT, esProfe], 
   grups_controller.updateGrup);

router.delete('/grups/:grupId',
  // [ validateJWT, esProfe], 
   grups_controller.deleteGrup);
