import {response,request, query} from 'express';
import bcrypt from 'bcrypt';

import { generateJWT_Roles } from '../helpers/generate_jwt.js';
import { handleError } from '../helpers/handleResponse.js';

import { ConexionUsers } from '../databases/conexion_user.js';

const conx = new ConexionUsers();

const auth_controller = { 
    login : async (req, res = response) => {
        const password = req.body.password
        const user = req.user
        try {
    
            // const isMatch = password == user.dataValues.password;
            const isMatch = await bcrypt.compare(password, user.dataValues.password);
            if (!isMatch) {
                return res.status(404).json({
                    'msg': 'Fallo en el login',
                    status: false
                });
            }
            
            console.log('Login de usuario', user);
            let token = generateJWT_Roles(user.dataValues)
            
            res.status(200).json({
                msg: 'Te has logeado correctamente',
                token: token,
                roles:user.dataValues.User_roles.map(userRole => userRole.Rol.name),
                status: true
            });
            
        } catch (err) {
            handleError(err,res)
        }
    },
}

export default auth_controller