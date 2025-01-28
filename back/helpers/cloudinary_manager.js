import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuidv4 } from 'uuid';  //Este paquete nos permitirá crear un archivo con nombre único.
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import  { v2 as cloudinary } from 'cloudinary'

//Para obtener el directorio actual.
// const cloudinary = require('cloudinary').v2
cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const upFile = async (files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '') => {

    return new Promise( async (resolve, reject) => {

        const { archivo } = files;
        // console.log("Archivo:",archivo);
        const nombreCortado = archivo.name.split('.');
        // console.log("Nombre cortado:",nombreCortado);
        const extension = nombreCortado[ nombreCortado.length - 1 ];
        // console.log("Extension:",extension);    

        //Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${extensionesValidas}`);
        }
        
        const { tempFilePath } = archivo
        //Cloudinary le da un nombre de seguridad al archivo que podemos obterner en 'secure_url'.

        try {

            if (extension === 'txt') {
                let options = {
                    resource_type: "raw",//<-- Esto permite subir cualquier archivo, si no se pone se le aplica el filtro automático de Cloudinary de iomagen.
                    folder: carpeta
                };

                options.resource_type = "auto";
                options.public_id = archivo.name;

                let uploaded
                try {
                    uploaded = await cloudinary.uploader.upload(tempFilePath, options);
                    //console.log("Archivo subido a Cloudinary:", uploaded);
                } catch (error) {
                    console.error("Error al subir archivo a Cloudinary:", error);
                    throw error; 
                }
                //console.log("Archivo subido a Cloudinary:", uploaded);
                const { secure_url, public_id } = uploaded;
                resolve({secure_url, public_id});
                
            } else {
                // console.log("Carpeta:",carpeta);
                // console.log("TempFilePath:",tempFilePath);
                // console.log("CLOUDINARY_URL:", process.env.CLOUDINARY_URL);
                let uploaded
                try {
                    uploaded = await cloudinary.uploader.upload(tempFilePath, { folder: carpeta });
                    //console.log("Archivo subido a Cloudinary:", uploaded);
                } catch (error) {
                    console.error("Error al subir archivo a Cloudinary:", error);
                    throw error; 
                }
                const { secure_url, public_id } = uploaded;
                resolve({secure_url, public_id});
            }


           

        } catch (error) {
            reject(error);
        }
    });

}

