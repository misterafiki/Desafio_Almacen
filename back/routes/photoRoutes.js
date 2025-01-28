import { Router } from 'express';

import { validateFiles } from '../middlewares/validateFile.js';
import { delFile, upFile  } from'../controllers/photo-controller.js';
import { validateJWT } from '../middlewares/validarJWT.js'

export const router = Router();
// Ruta de imagenes:

router.post( '/', [validateJWT,validateFiles], upFile );
router.delete('/:id',[validateJWT], delFile  )
