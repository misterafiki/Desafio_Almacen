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

    getUserById :  (req, res = response) => {
        let id = req.params.id
        try {
            let users = conx.getUsuario(id)    
            console.log('Listado correcto!');
            res.status(200).json(users);
        } catch (err) {
            handleError(err,res)
        }
    },

    // usuariosPost :  (req = request, res = response) => {
    //     conx.registrarUsuario(req.body)    
    //         .then( msg => {
    //             console.log('Insertado correctamente!');
    //             console.log(msg.Roles)
    //             const token = generarJWT_Roles(msg.id,msg.Roles);
    //             console.log(token);
    //             res.status(201).json({msg,token});
    //         })
    //         .catch( err => {
    //             console.log('Fallo en el registro!',err);
    //             res.status(203).json(err);
    //         });
    // },
    
    usuariosDelete : async(req, res = response) => {
        let user = req.user
        try {
            await conx.deleteUser(user)    
            console.log('Borrado correctamente!');
            res.status(202).json({'msg':'Usuario eliminado'});
            
        } catch (err) {
            handleError(err,res)
        }
    },

    // usuariosPut :  (req, res = response) => {
    //     conx.modificarUsuario(req.params.id, req.body)    
    //         .then( msg => {
    //             console.log('Modificado correctamente!');
    //             res.status(202).json(msg);
    //         })
    //         .catch( err => {
    //             console.log('Fallo en la modificación!');
    //             res.status(203).json(err);
    //         });
    // }
}

export default users_controller