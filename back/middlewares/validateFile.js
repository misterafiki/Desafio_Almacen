import { response } from 'express'


export const validateFiles = (req, res, next ) => {

    // console.log("Interceptando solicitud:", req.method, req.path);
    
    // console.log('Archivo recibido',req.files)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}



