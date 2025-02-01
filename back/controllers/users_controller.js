import { response, request } from 'express';
import { ConexionUsers as Conexion } from '../databases/conexion_user.js'
import { handleError,handleSuccess } from '../helpers/handleResponse.js';
import * as generate from 'generate-password'
import {sendMail} from "../helpers/nodeMailer.js";
import bcrypt from 'bcrypt';

const conx = new Conexion();

const users_controller = { 
    getUsers :  async(req, res = response) => {
        try {
            let users = await conx.getUsers()
            console.log('Listado correcto!');
            handleSuccess(res, 200, 'Usuarios encontrado correctamente', users);
        } catch (err) {
            handleError(err,res)
        }
    },

    getUserById :  async(req, res = response) => {
        let id = req.params.id
        try {
            let users = await conx.getUserById(id)
            console.log('Listado correcto!');
            handleSuccess(res, 200, 'Usuario encontrado correctamente', users);
        } catch (err) {
            handleError(err,res)
        }
    },

    createUser: async (req, res = response) => {
        try {
            const password = generate.generate({ length: 8, numbers: true, symbols: false});
            req.body.password = password;
            console.log(password);
            console.log(req.body);
            let user = await conx.addUser(req.body);
            console.log('Controller: User created');

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: password,
                login_url: 'http://localhost:4200/login'
            }

            await sendMail(req.body.email, 'Bienvenido a Aptiza 3.0', data, 'email-template.html')

            res.status(201).json({ user });
        } catch (err) {
            handleError(err, res);
        }
    },
    
    deleteUser : async(req, res = response) => {
        let user = req.reqUser
        try {
            await conx.deleteUser(user)    
            console.log('Borrado correctamente!');
            handleSuccess(res, 202, 'El usuario ha sido marcado como eliminado.');
        } catch (err) {
            handleError(err,res)
        }
    },

    updateUser: async (req, res = response) => {
        try {
            let user = await conx.updateUser(req.reqUser, req.body);
            console.log('Controller: User updated');
            res.status(200).json({ msg: 'User updated', user });
        } catch (err) {
            handleError(err, res);
        }
    },

    recoverUser: async (req, res = response) => {
        try {
            const { email } = req.params;
            if (!email) {
                return res.status(400).json({ success: true, msg: 'Email is required' });
            }

            const decodedEmail = decodeURIComponent(email);

            const user = await conx.getUserByEmail(decodedEmail);
            if (!user) {
                return res.status(404).json({ success: true, msg: 'User not found' });
            }

            const newPassword = generate.generate({ length: 8, numbers: true, symbols: false });
            const newUserData = user.toJSON()
            newUserData.password = await bcrypt.hash(newPassword, 10);

            await conx.updateUser(user, newUserData);

            const data = {
                name: user.name,
                email: user.email,
                new_password: newPassword,
                login_url: 'http://localhost:4200/login'
            };
            await sendMail(user.email, 'Recuperación de contraseña', data, 'forgot-template.html');

            res.status(200).json({ success: true, msg: 'Password reset successful. Check your email for the new password.', user: user });
        } catch (err) {
            handleError(err, res);
        }
    }
}

export default users_controller