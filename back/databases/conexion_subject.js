import { Sequelize } from 'sequelize';
import { Subject, User, User_role, Roles, SubjectGrups } from '../models/associations.js';
import db from './connection.js';
class ConexionSubject {

  constructor() {}

  addProfessorToSubject = async (subjectId, userId) => {
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
        return { code: 404, message: 'Usuario no encontrado o no es un profesor' };
      }

      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return { code: 404, message: 'Asignatura no encontrada' };
      }

      await SubjectGrups.create({
        subject_id: subjectId,
        teacher_id: userId,
      });

      return { code: 200, message: 'Profesor añadido correctamente a la asignatura' };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };
}

export { ConexionSubject };
