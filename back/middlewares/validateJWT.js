import jwt from 'jsonwebtoken';
import {response, request} from 'express' //Incorporamos esto aquí porque vamos a añadir elementos a req que sacaremos del token.

import { ConexionUsers } from '../databases/conexion_user.js';
import User from '../models/user.js';

const conx = new ConexionUsers();

export const validateJWT = async(req , res , next) => {  //Estas asignaciones son necesarias para almacenar en el request los datos que extraigamos del token.
    const token = req.header('x-token')  //Este nombre será establecido en el cliente también.

    if (!token){
        return res.status(402).json({'msg':'No hay token en la petición.'})
    }

    try {
        const {uid, roles} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.idToken = uid
        let user = await conx.getUserById(uid)
        req.user = user
        req.roles = roles
        console.log(uid)
        console.log(user)
        console.log(roles)
        console.log(token)
        next()
        
    }catch(error){
        console.log(error);
        res.status(401).json({'msg':'Token no válido.'})
    }
}

