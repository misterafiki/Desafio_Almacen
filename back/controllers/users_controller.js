import { response, request } from 'express';
import { ConexionUser as Conexion } from '../databases/conexion_user.js'
import {generarJWT, generarJWT_Roles} from '../helpers/generate_jwt.js'

const conx = new Conexion();

const controladorUsuarios = { 
    usuariosGet :  (req, res = response) => {
        conx.getlistado({ where: { deletedAt: null } })    
            
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registros');
                res.status(203).json({'msg':'No se han encontrado registros'});
            });
    },

    usuarioGet :  (req, res = response) => {
        conx.getUsuario(req.params.id, { where: { deletedAt: null } })    
            .then( msg => {
                console.log('Listado correcto!');
                res.status(200).json(msg);
            })
            .catch( err => {
                console.log('No hay registro!');
                res.status(203).json({'msg':'No se ha encontrado el registro'});
            });
    },

    usuariosPost :  (req = request, res = response) => {
        conx.registrarUsuario(req.body)    
            .then( msg => {
                console.log('Insertado correctamente!');
                console.log(msg.Roles)
                const token = generarJWT_Roles(msg.id,msg.Roles);
                console.log(token);
                res.status(201).json({msg,token});
            })
            .catch( err => {
                console.log('Fallo en el registro!',err);
                res.status(203).json(err);
            });
    },

    usuarioLogin :  (req = request, res = response) => {
        conx.logearUsuario(req.body)    
            .then( msg => {
                console.log('Logeado correctamente!');
                const token = generarJWT_Roles(msg.id,msg.RolesAsignados.roles);
                console.log(msg.RolesAsignados.roles);
                res.status(201).json({msg, token});
            })
            .catch( err => {
                console.log('Fallo en el registro!');
                res.status(203).json(err);
            });
    },
    
    usuariosDelete : (req, res = response) => {
        conx.borrarUsuario(req.params.id)    
            .then( msg => {
                console.log('Borrado correctamente!');
                res.status(202).json(msg);
            })
            .catch( err => {
                console.log('Fallo en el borrado!');
                res.status(203).json(err);
            });
    },

    usuariosPut :  (req, res = response) => {
        conx.modificarUsuario(req.params.id, req.body)    
            .then( msg => {
                console.log('Modificado correctamente!');
                res.status(202).json(msg);
            })
            .catch( err => {
                console.log('Fallo en la modificación!');
                res.status(203).json(err);
            });
    }
}

export default controladorUsuarios