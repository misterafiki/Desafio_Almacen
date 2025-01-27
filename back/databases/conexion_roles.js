import { Sequelize } from 'sequelize';
// import Roles from '../models/roles.js';
import { RolesAsignados,Persona,Tarea,Roles } from '../models/associations.js';

import db from './connection.js';


class ConexionRoles {

    constructor(){
        // this.db = createConnection(); //Obtenemos la instancia única de Sequelize.
        // this.comprobar();
    }

    //----------------------------------------
    getRoles = async() => {
        let resultado = [];
        //console.log('Accediendo a los datos...')
        resultado = await Roles.findAll();
        if (!resultado){
            throw error;
        }
        return resultado;
    }

   
}

export { ConexionRoles };
