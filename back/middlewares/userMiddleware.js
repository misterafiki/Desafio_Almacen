import {response, request} from 'express' 
import { ConexionUsers } from '../databases/conexion_user.js';
import { handleError } from '../helpers/handleResponse.js';
import role from "../models/role.js";

const conx = new ConexionUsers();

export const existUserByEmail = async (req , res , next) => { 
    const email = req.body.email
    try {
        let user = await conx.getUserByEmail(email) 
        req.reqUser = user
        next()       
    }catch(err){
        handleError(err,res)
    }
}
export const existUserById = async (req , res , next) => { 
    const id = req.params.id
    try {
        let user = await conx.getUserById(id) 
        req.reqUser = user
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
    const { name, email, password, role } = req.body;

if (typeof name !== 'string' || name.trim().length < 4 || name.trim().length > 255) {
    return res.status(400).json({ msg: 'El nombre es requerido y debe ser un texto entre 4 y 255 caracteres.',status:false });
}

if (typeof email !== 'string' || email.trim().length < 4 || email.trim().length > 255) {
    return res.status(400).json({ msg: 'El email es requerido y debe ser un texto entre 4 y 255 caracteres.',status:false });
}

if (typeof password !== 'string' || password.trim().length < 4 || password.trim().length > 255) {
    return res.status(400).json({ msg: 'La contraseña es requerida y debe ser un texto entre 4 y 255 caracteres.',status:false });
}

next();

}
export const validateUpdatePassword  = (req , res , next) => { 
    const { currentPassword, newPassword, confirmPassword } = req.body;

if (typeof currentPassword !== 'string' || currentPassword.trim().length < 4 || currentPassword.trim().length > 255) {
    return res.status(400).json({ msg: 'La contraseñaActual es requerida y debe ser un texto entre 4 y 255 caracteres.',status:false });
}
if (typeof newPassword !== 'string' || newPassword.trim().length < 4 || newPassword.trim().length > 255) {
    return res.status(400).json({ msg: 'La contraseñaNueva es requerida y debe ser un texto entre 4 y 255 caracteres.',status:false });
}
if (typeof confirmPassword !== 'string' || confirmPassword.trim().length < 4 || confirmPassword.trim().length > 255) {
    return res.status(400).json({ msg: 'La confirmacion de contraseña es requerida y debe ser un texto entre 4 y 255 caracteres.',status:false });
}
if (newPassword != confirmPassword) {
    return res.status(404).json({
        'msg': 'la contraseñas no coinciden',
        status: false
    });
}

// if (typeof role !== 'string' || role.trim().length < 3 || role.trim().length > 255) {
//     return res.status(400).json({ msg: 'El rol es requerido y debe ser un texto entre 3 y 255 caracteres.' });
// }

// const validRoles = ["profesor", "administrador", "direccion", "jefedepartamento"];

// if (!validRoles.includes(role.trim().toLowerCase())) {
//     return res.status(400).json({ msg: 'El rol seleccionado es invalido.' });
// }

next();

}

