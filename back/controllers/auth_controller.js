import {response,request, query} from 'express';
import bcrypt from 'bcrypt';

import { generateJWT_Roles } from '../helpers/generate_jwt.js';
import { handleError } from '../helpers/handleErrors.js';

import { ConexionUsers } from '../databases/conexion_user.js';

const conx = new ConexionUsers();

const auth_controller = { 
    login : async (req, res = response) => {
        const password = req.body.password
        const user = req.user
        try {
    
            const isMatch = password == user.dataValues.password;
    
            if (isMatch) {
                console.log('Login de usuario', user);
                let token = generateJWT_Roles(user.dataValues)
                
                return res.status(200).json({
                    msg: 'Te has logeado correctamente',
                    token: token,
                    status: true
                });
            }
            res.status(404).json({
                'msg': 'Usuario no encontrado',
                status: false
            });
            
        } catch (err) {
            handleError(err,res)
        }
    },
}

export default auth_controller