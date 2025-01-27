import {response,request} from 'express';
import {ConexionRoles as Conexion} from '../databases/conexion_roles.js'

const conx = new Conexion();

const controladorRoles = { 
        rolesGet :  (req, res = response) => {
        conx.getRoles()    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros');
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    }

}

export default controladorRoles