import { Sequelize } from 'sequelize';
import { Grups, User, User_role, Roles, SubjectGrups } from '../models/associations.js';
import db from './connection.js';

class ConexionGrup {
  constructor() {}

  async addTutorToGrup(grupId, userId) {
    try {
      const user = await User.findByPk(userId, {
        include: [
          {
            model: User_role,
            as: 'User_roles',
            include: [
              {
                model: Roles,
                as: 'Rol',
                where: { name: 'profesor' },
              },
            ],
          },
        ],
      });

      if (!user) {
        return { error: 404, message: 'Usuario no encontrado o no es profesor' };
      }

      const grup = await Grups.findByPk(grupId);
      if (!grup) {
        return { error: 404, message: 'Grupo no encontrado' };
      }

      const tutor = await SubjectGrups.create({ grup_id: grupId, teacher_id: userId });
      return tutor;
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }

  async updateTutorToGrup(grupId, newUserId) {
    try {
      const user = await User.findByPk(newUserId, {
        include: [
          {
            model: User_role,
            as: 'User_roles',
            include: [
              {
                model: Roles,
                as: 'Rol',
                where: { name: 'profesor' },
              },
            ],
          },
        ],
      });

      if (!user) {
        return { error: 404, message: 'Usuario no encontrado o no es profesor' };
      }

      const subjectGrup = await SubjectGrups.findOne({ where: { grup_id: grupId } });
      if (!subjectGrup) {
        return { error: 404, message: 'Tutor del grupo no encontrado' };
      }

      subjectGrup.teacher_id = newUserId;
      await subjectGrup.save();

      return subjectGrup;
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }

  async deleteTutorToGrup(grupId) {
    try {
      const subjectGrup = await SubjectGrups.findOne({ where: { grup_id: grupId } });
      if (!subjectGrup) {
        return { error: 404, message: 'Tutor del grupo no encontrado' };
      }

      await subjectGrup.destroy();
      return { message: 'Tutor eliminado del grupo' };
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }

  async addGrup(data) {
    try {
      const grup = await Grups.create(data);
      return grup;
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }

  async updateGrup(grupId, data) {
    try {
      const grup = await Grups.findByPk(grupId);
      if (!grup) {
        return { error: 404, message: 'Grupo no encontrado' };
      }

      await grup.update(data);
      return grup;
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }

  async deleteGrup(grupId) {
    try {
      const grup = await Grups.findByPk(grupId);
      if (!grup) {
        return { error: 404, message: 'Grupo no encontrado' };
      }

      await grup.destroy();
      return { message: 'Grupo eliminado' };
    } catch (err) {
      return { error: 500, message: err.message };
    }
  }
}

export { ConexionGrup };
