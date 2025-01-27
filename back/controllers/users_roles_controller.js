import {response,request} from 'express';
import {ConexionUsersRoles as Conexion} from '../databases/conexion_users_roles.js'

import { handleError } from '../helpers/handleErrors.js';

const conx = new Conexion();

const users_roles_controller = { 
    rolesAsignadosGet :  async(req, res = response) => {
        try {
            let response = await conx.getRolesAsignados()    
            
            console.log('Listado de roles asignados con los usuarios correcto');
            res.status(200).json(response);
        } catch (err) {
            handleError(err,res)
        }
    },

    rolesAsignadosIdGet:  async(req, res = response) => {
        let id = req.params.id
        try {
            let response = await conx.getRolesAsignadosID(id)    
    
            console.log('Listado correcto!');
            res.status(200).json(response);
        } catch (err) {
            handleError(err,res)
        }
    },

}

export default users_roles_controller