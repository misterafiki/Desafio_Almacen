import {response,request} from 'express';
import {ConexionRoles as Conexion} from '../databases/conexion_role.js'

import { handleError } from '../helpers/handleResponse.js';

const conx = new Conexion();

const roles_controller = { 
    rolesGet :  async (req, res = response) => {
        try {
            let roles = await conx.getRoles()

            console.log('Listado de roles correcto');
            handleSuccess(res, 200, 'Roles encontrado correctamente', users);
            
        } catch (err) {
            handleError(err,res)
        }
    }

}

export default roles_controller