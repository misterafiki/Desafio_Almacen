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

        //--------------------- Usando el helper ----------------------
        //Comentando/descomentando lo siguiente se admiten textos/imágenes.
        //const {secure_url, public_id} = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const {secure_url, public_id} = await upFile( req.files, undefined, 'imgs' );
        let img = public_id.split('/').pop();
        console.log(img)
        const user = await conx.modificarImg(req.idToken,img);

        console.log("secure url:",secure_url, '       public-id: ',public_id);
        res.json({ secure_url, user });




    } catch (msg) {
        res.status(401).json({ msg });
    }

}


const delFile = async(req, res = response ) => {
    const  idborrado = req.params.id;

    console.log(idborrado);
    try {
        const uploaded = await cloudinary.uploader.destroy(process.env.CLOUDINARY_FILES + idborrado); 

        res.json(uploaded);

    } catch (error) {
        res.status(401).json({ msg : "Error al borrar la imagen en Cloudinary" });
    }
}

export {
    uploadFile ,
    delFile
}
