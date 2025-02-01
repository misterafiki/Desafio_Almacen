import { SubjectGrups, User } from '../models/associations.js';

export const existSubjectById = async (req, res, next) => {
    const { subjectId } = req.params;
    const subject = await SubjectGrups.findOne({ where: { subject_id: subjectId } });

    if (!subject) {
        return res.status(404).json({ code: 404, message: 'Asignatura no encontrada' });
    }
    next();
};

export const existTeacherById = async (req, res, next) => {
    const { teacherId } = req.params;
    const teacher = await User.findByPk(teacherId);

    if (!teacher) {
        return res.status(404).json({ code: 404, message: 'Profesor no encontrado' });
    }
    next();
};
