import {response, request} from 'express' 
import { ConexionUsers } from '../databases/conexion_user.js';
import { handleError } from '../helpers/handleErrors.js';

const conx = new ConexionUsers();

export const existUserByEmail = async (req , res , next) => { 
    const email = req.body.email
    try {
        let user = await conx.getUserByEmail(email) 
        req.user = user
        next()       
    }catch(err){
        handleError(err,res)
    }
}
export const existUserById = async (req , res , next) => { 
    const id = req.params.id
    try {
        let user = await conx.getUserById(id) 
        req.user = user
        next()       
    }catch(err){
        handleError(err,res)
    }
}
export const validateEmailUnique = async (req , res , next) => { 
    const email = req.body.email
    try {
        await conx.getUserByEmail(email)
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

