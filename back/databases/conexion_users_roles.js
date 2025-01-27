import { Sequelize } from 'sequelize';

import { User_role,User } from '../models/associations.js'

import db from './connection.js';

class ConexionUsersRoles {

    constructor(){ }

    getRolesAsignados = async() => {
        try {
            let resultado = await User_role.findAll();
            if (!resultado){
                throw new Error('Rol no encontrado');
            }
            return resultado;
            
        } catch (err) {
            throw err
        }

    }

    getRolesAsignadosID = async(id) => {
        try {
            let resultado = await User.findOne({
                where: { 
                    id: id 
                },
                include: ['User_role']
            });
    
            if (!resultado){
                throw new Error('Rol no encontrado');
            }
            return resultado;
        } catch (err) {
            throw err
        }
        
    }

}

export { ConexionUsersRoles };
