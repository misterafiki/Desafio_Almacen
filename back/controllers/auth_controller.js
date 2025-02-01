import {response,request, query} from 'express';
import bcrypt from 'bcrypt';

import { generateJWT_Roles } from '../helpers/generate_jwt.js';
import { handleError,handleSuccess } from '../helpers/handleResponse.js';

import { ConexionUsers } from '../databases/conexion_user.js';
import User from '../models/user.js';

const conx = new ConexionUsers();

const auth_controller = {
    login : async (req, res = response) => {
        const password = req.body.password
        const user = req.reqUser
        try {
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
                name:user.dataValues.name,
                status: true
            });

        } catch (err) {
            handleError(err,res)
        }
    },
    getUserData : async (req, res = response) => {
        const user = req.user.dataValues
        const userData = new User(user).getUserInfo()
        try {      
            res.status(200).json({
                msg: 'estos son tus datos',
                data: userData,
                status: true
            });
            
        } catch (err) {
            handleError(err,res)
        }
    },
    updateUserPassword : async(req, res = response) => {
        let user = req.user
        console.log(req.body)
        let{currentPassword,newPassword,confirmPassword} = req.body
        const isMatch = await bcrypt.compare(currentPassword, user.dataValues.password);
        if (!isMatch) {
            return res.status(404).json({
                'msg': 'la contraseña no es correcta',
                status: false
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let password = {password: hashedPassword}
        try {
            await conx.updateUser(user,password)    
            handleSuccess(res, 202, 'contraseña actualizada');
            
        } catch (err) {
            handleError(err,res)
        }
    },
}

export default auth_controller