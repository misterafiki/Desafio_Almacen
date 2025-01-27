import {response,request} from 'express';
import {ConexionAssignedRoles as Conexion} from '../databases/conexion_assigned_roles.js'

const conx = new Conexion();

const controladorAssignedRoles = { 
    rolesAsignadosGet :  (req, res = response) => {
        conx.getRolesAsignados()    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros');
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    },

    rolesAsignadosIdGet:  (req, res = response) => {
        conx.getRolesAsignadosID(req.params.id)    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros',err);
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    },

}

export default controladorAssignedRoles