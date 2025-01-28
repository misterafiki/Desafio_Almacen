import { Router } from 'express';

import { validateFiles } from '../middlewares/validateFile.js';
import { delFile,uploadFile  } from'../controllers/photo-controller.js';
import { validateJWT } from '../middlewares/validateJWT.js'

export const router = Router();
// Ruta de imagenes:

router.post( '/', [validateJWT,validateFiles], uploadFile );

router.delete('/:id',[validateJWT], delFile  ) //el id es el id de la img de cloudinary
