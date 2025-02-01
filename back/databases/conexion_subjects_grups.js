import { SubjectGrups, User } from '../models/associations.js';

class ConexionSubjectGrups {
  constructor() {}

  getTeacherIdBySubjectId = async (subjectId) => {
    try {
      const subjectGrup = await SubjectGrups.findOne({
        where: { subject_id: subjectId },
        attributes: ['teacher_id'],
      });

      if (!subjectGrup) {
        return { code: 404, message: 'No se encontró un profesor para la asignatura proporcionada' };
      }

      return { code: 200, teacher_id: subjectGrup.teacher_id };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };

  getTeacherById = async (teacherId) => {
    try {
      const teacher = await User.findByPk(teacherId);

      if (!teacher) {
        return { code: 404, message: 'Profesor no encontrado' };
      }

      return { code: 200, teacher: teacher };
    } catch (err) {
      return { code: 500, message: 'Error del servidor', error: err.message };
    }
  };
}

export { ConexionSubjectGrups };
