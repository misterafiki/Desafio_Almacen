import path from 'path'
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import  { response } from 'express';
import { upFile } from '../helpers/cloudinary_manager.js';
import  { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
import { ConexionUsers as Conexion } from '../databases/conexion_user.js'

import { handleError } from '../helpers/handleResponse.js';

const conx = new Conexion();

dotenv.config();

const uploadFile = async(req, res = response) => {
    try {
        // Usando el helper: Comentando/descomentando se admiten textos/imágenes.
        // const {secure_url, public_id} = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const { secure_url, public_id } = await upFile(req.files, undefined, 'imgs');
        
        let img = public_id.split('/').pop();
        console.log(img);

        const result = await conx.changeImg(req.user, img);

        if (!result) {
            return res.status(404).json({ 
                msg: "no se pudo actualizar la imagen" 
            });
        }

        console.log("secure url:", secure_url, '       public-id: ', public_id);
        res.json({ secure_url});

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            msg: "Error al procesar la solicitud. Por favor, intente nuevamente más tarde.",
            error: error.message || "Error desconocido"
        });
    }
};



const delFile = async(req, res = response ) => {
    const  idDelete = req.params.id;

    console.log(idDelete);
    try {
        const uploaded = await cloudinary.uploader.destroy(process.env.CLOUDINARY_FILES + idDelete); 
        res.json(uploaded);

    } catch (error) {
        res.status(401).json({ msg : "Error al borrar la imagen en Cloudinary" });
    }
}

export {
    uploadFile ,
    delFile
}
