import { Sequelize } from 'sequelize';
import { AssignedRoles, User, Roles } from '../models/associations.js';
import db from './connection.js';
import bcrypt from 'bcryptjs';

class ConexionUsers {
  constructor() {
    // this.db = createConnection(); //Obtenemos la instancia única de Sequelize.
    // this.comprobar();
  }

  getlistado = async () => {
    let resultado = [];
    resultado = await User.findAll();
    if (!resultado) {
      throw new Error('No se encontraron resultados');
    }
    return resultado;
  }

  getUsuario = async (id) => {
    let resultado = [];
    resultado = await User.findByPk(id);
    if (!resultado) {
      throw new Error('Usuario no encontrado');
    }
    return resultado;
  }

  registrarUsuario = async (body) => {
    let resultado = 0;
    const defaultRoleId = 2;
    try {
      body.clave = await bcrypt.hash(body.clave, 10);
  
      // Crear un nuevo usuario en la tabla User
      const usuarioNuevo = new User(body); 
      await usuarioNuevo.save();
  
      // Asignar el rol por defecto en la tabla AssignedRoles
      await AssignedRoles.create({
        user_id: usuarioNuevo.id,  
        rol_id: defaultRoleId,  
        created_at: new Date(),  
        updated_at: new Date(),  
        deleted_at: null,       
      });
  
      // Obtener los roles asociados al usuario, incluyendo el recién asignado
      const rolesData = await AssignedRoles.findAll({
        where: { user_id: usuarioNuevo.id },
        include: [{
            model: Roles,
            as: 'Rol',
            attributes: ['name']
        }],
      });
      
      const roles = rolesData.map(rol => rol.Rol.descripcion);
      usuarioNuevo.Roles = roles;
      resultado = usuarioNuevo;
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        console.log(`El email ${body.email} ya existe en la base de datos.`);
      } else {
        console.log('Ocurrió un error desconocido: ', error);
      }
      throw error;
    }
    return resultado;
  };
  

  logearUsuario = async (body) => {
    let resultado = 0;
    try {
      const usuario = await User.findOne({
        where: { email: body.email },
        include: [{
          model: AssignedRoles,
          as: 'AssignedRoles',
          attributes: ['idra'],
          include: {
            model: Roles,
            as: 'Rol',
            attributes: ['descripcion']
          }
        }],
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
      });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      const esValida = await bcrypt.compare(body.clave, usuario.clave);
      if (!esValida) {
        throw new Error('Contraseña incorrecta');
      }
      resultado = usuario;
    } catch (error) {
      console.log('Error al intentar logear: ', error.message);
      throw error;
    }
    
    const roles = resultado.AssignedRoles.map(rol => rol.Rol.descripcion);
    resultado.AssignedRoles = {roles};
    return resultado;
  }

  modificarUsuario = async (id, body) => {
    let resultado = await User.findByPk(id);
    if (!resultado) {
      throw new Error('Usuario no encontrado');
    }
    body.clave = await bcrypt.hash(body.clave, 10);
    await resultado.update(body);
    return resultado;
  }
  modificarImg = async (id, imgen) => {
    let resultado = await User.findByPk(id);
    if (!resultado) {
      throw new Error('Usuario no encontrado');
    }
    const img = {img:imgen};
    await resultado.update(img);
    return resultado;
  }

  borrarUsuario = async (id) => {
    let resultado = await User.findByPk(id);
    if (!resultado) {
      throw new Error('Usuario no encontrado');
    }
    await resultado.destroy();
    return resultado;
  }
}

export { ConexionUsers as ConexionUsuarios };
