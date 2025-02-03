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

  updateProfessorToSubject = async (subjectId, userId, newUserId) => {
    try {
      const newUser = await User.findByPk(newUserId, {
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

      if (!newUser) {
        return { code: 404, message: 'Nuevo usuario no encontrado o no es un profesor' };
      }

      const subjectGroup = await SubjectGrups.findOne({
        where: { subject_id: subjectId, teacher_id: userId },
      });

      if (!subjectGroup) {
        return { code: 404, message: 'Relación asignatura-profesor no encontrada' };
      }

      subjectGroup.teacher_id = newUserId;
      await subjectGroup.save();

      return { code: 200, message: 'Profesor actualizado correctamente en la asignatura' };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  deleteProfessorToSubject = async (subjectId, userId) => {
    try {
      const subjectGroup = await SubjectGrups.findOne({
        where: { subject_id: subjectId, teacher_id: userId },
      });

      if (!subjectGroup) {
        return { code: 404, message: 'Relación asignatura-profesor no encontrada' };
      }

      await subjectGroup.destroy();

      return { code: 200, message: 'Profesor eliminado correctamente de la asignatura' };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  addSubject = async (name) => {
    try {
      const subject = await Subject.create({ name });
      return { code: 200, message: 'Asignatura añadida correctamente', subject };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  updateSubject = async (subjectId, newName) => {
    try {
      const subject = await Subject.findByPk(subjectId);

      if (!subject) {
        return { code: 404, message: 'Asignatura no encontrada' };
      }

      subject.name = newName;
      await subject.save();

      return { code: 200, message: 'Asignatura actualizada correctamente' };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  deleteSubject = async (subjectId) => {
    try {
      const subject = await Subject.findByPk(subjectId);

      if (!subject) {
        return { code: 404, message: 'Asignatura no encontrada' };
      }

      await subject.destroy();

      return { code: 200, message: 'Asignatura eliminada correctamente' };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  getSubjects = async () => {
    try {
      const subjects = await Subject.findAll();

      if (!subjects.length) {
        return { code: 404, message: 'No se encontraron asignaturas' };
      }

      return { code: 200, message: 'Asignaturas obtenidas correctamente', subjects };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };
  
  getSubjectById = async (subjectId) => {
    try {
      const subject = await Subject.findByPk(subjectId);

      if (!subject) {
        return { code: 404, message: 'Asignatura no encontrada' };
      }

      return { code: 200, message: 'Asignatura obtenida correctamente', subject };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

}

export { ConexionSubject };
