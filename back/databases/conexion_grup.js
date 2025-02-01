import { Sequelize } from 'sequelize';
import { Grups, User, User_role, Roles, SubjectGrups } from '../models/associations.js';
import db from './connection.js';

class ConexionGrup {
  constructor() {}

  addTutorToGrup = async (userId, grupId) => {
    try {
      const user = await User.findByPk(userId, {
        include: [{
          model: User_role,
          as: 'User_roles',
          include: [{
            model: Roles,
            as: 'Rol',
            attributes: ['id', 'name']
          }]
        }]
      });

      if (!user) {
        return { error: { code: 404, message: 'Usuario no encontrado' } };
      }

      const hasTutorRole = user.User_roles.some(role => role.Rol.name === 'tutor');

      if (!hasTutorRole) {
        return { error: { code: 403, message: 'El usuario no tiene el rol de tutor' } };
      }

      const grup = await Grups.findByPk(grupId);
      if (!grup) {
        return { error: { code: 404, message: 'Grupo no encontrado' } };
      }

      await SubjectGrups.create({ grup_id: grupId, teacher_id: userId });
      return { success: { code: 200, message: 'Tutor asignado al grupo exitosamente' } };

    } catch (err) {
      return { error: { code: 500, message: 'Error interno del servidor', details: err.message } };
    }
  }
}

export { ConexionGrup };
