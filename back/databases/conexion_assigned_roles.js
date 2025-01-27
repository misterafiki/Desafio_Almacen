import { col, Sequelize } from 'sequelize';
import { AssignedRoles,User,Roles } from '../models/associations.js'

import db from './connection.js';

class ConexionAssignedRoles {

    constructor(){ }

    comprobar = async () => {
        try {
            await db.authenticate(); //Espera a que se establezca la conexión
            console.log('Conexión establecida correctamente.');
        } catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    }

    getRolesAsignados = async() => {
        let resultado = [];
        //console.log('Accediendo a los datos...')
        resultado = await AssignedRoles.findAll();
        if (!resultado){
            throw error;
        }
        return resultado;
    }

    getRolesAsignadosID = async(dn) => {
        let resultado = [];
        console.log('Accediendo a los datos...', dn)
        
        resultado = await User.findOne({ where: { id: dn } , include: ['AssignedRoles']}); //Con esta consulta podemos probar esto: localhost:9090/api/rolesasignados/1A que nos da los roles del usuario 1A.
        // resultado = await Roles.findOne({ where: { id: dn } , include: ["AssignedRoles"]});    //Con esta consulta podemos probar esto: localhost:9090/api/rolesasignados/1 que nos da los administradores del grupo.
        console.log(resultado)
        if (!resultado){
            throw error;
        }
        return resultado;
    }

}

export { ConexionAssignedRoles };
