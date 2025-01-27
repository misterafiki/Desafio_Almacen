import {response, request} from 'express' 
import ConexionUser from '../database/ConexionUser.js'
import { handleError } from '../helpers/handleErrors.js';

const conx = new ConexionUser();
export const existUser = async (req , res , next) => { 
    const email = req.body.email
    try {
        let user = await conx.getUserEmail(email) 
        req.user = user
        next()       
    }catch(err){
        handleError(err,res)
    }
}
export const validateEmailUnique = async (req , res , next) => { 
    const email = req.body.email
    try {
        await conx.getUserEmail(email)
        return res.status(400).json({ msg: 'este correo ya esta registrado'}); 
    }catch(err){
        if (err.message == 'Usuario no encontrado') {
           return next()      
        }
        handleError(err,res)
    }
}
export const validateUser  = (req , res , next) => { 
    const { name, email, password } = req.body;

if (typeof name !== 'string' || name.trim().length < 4 || name.trim().length > 255) {
    return res.status(400).json({ msg: 'El nombre es requerido y debe ser un texto entre 4 y 255 caracteres.' });
}

if (typeof email !== 'string' || email.trim().length < 4 || email.trim().length > 255) {
    return res.status(400).json({ msg: 'El email es requerido y debe ser un texto entre 4 y 255 caracteres.' });
}

if (typeof password !== 'string' || password.trim().length < 4 || password.trim().length > 255) {
    return res.status(400).json({ msg: 'La contraseña es requerida y debe ser un texto entre 4 y 255 caracteres.' });
}

next();

}

