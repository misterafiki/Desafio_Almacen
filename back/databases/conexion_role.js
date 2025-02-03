import { Sequelize } from 'sequelize';

import {Roles} from '../models/associations.js';

import db from './connection.js';


class ConexionRoles {

    constructor(){

    }

    getRoles = async() => {
        try {
            let result = await Roles.findAll();
            if (!result) {
                throw new Error('Rol no encontrado');
            }
    
            return result;
        } catch (err) {
            throw err
        }
    }

   
}

export { ConexionRoles };
