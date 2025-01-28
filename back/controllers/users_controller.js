import { response, request } from 'express';
import { ConexionUsers as Conexion } from '../databases/conexion_user.js'

import { handleError } from '../helpers/handleErrors.js';

const conx = new Conexion();

const users_controller = { 
    getUsers :  async(req, res = response) => {
        try {
            let users = await conx.getUsers()
            console.log('Listado correcto!');
            res.status(200).json(users);
        } catch (err) {
            handleError(err,res)
        }
    },

    getUserById :  async(req, res = response) => {
        let id = req.params.id
        try {
            let users = await conx.getUserById(id)
            console.log('Listado correcto!');
            res.status(200).json(users);
        } catch (err) {
            handleError(err,res)
        }
    },

    createUser: async (req, res = response) => {
        try {
            let user = await conx.addUser(req.body);
            console.log('Controller: User created');
            res.status(201).json({ user });
        } catch (err) {
            handleError(err, res);
        }
    },
    
    deleteUser : async(req, res = response) => {
        let user = req.user
        try {
            await conx.deleteUser(user)    
            console.log('User deleted!');
            res.status(202).json({'msg':'User Deleted'});
        } catch (err) {
            handleError(err,res)
        }
    },

    updateUser: async (req, res = response) => {
        try {
            let user = await conx.updateUser(req.user, req.body);
            console.log('Controller: User updated');
            res.status(200).json({ msg: 'User updated', user });
        } catch (err) {
            handleError(err, res);
        }
    }
}

export default users_controller