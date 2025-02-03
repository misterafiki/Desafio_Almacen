import { response, request } from 'express';
import { ConexionSubject as Conexion } from '../databases/conexion_subject.js';
import { handleError } from '../helpers/handleErrors.js';

const conx = new Conexion();

const subjects_controller = {
    subjectsGet: async (req, res = response) => {
        try {
            let subjects = await conx.getSubjects();
            console.log('Listado de asignaturas correcto');
            res.status(200).json(subjects);
        } catch (err) {
            handleError(err, res);
        }
    },

    subjectGetById: async (req, res = response) => {
        try {
            const { id } = req.params;
            let subject = await conx.getSubjectById(id);
            if (!subject) {
                return res.status(404).json({ message: 'Asignatura no encontrada' });
            }
            console.log('Asignatura encontrada');
            res.status(200).json(subject);
        } catch (err) {
            handleError(err, res);
        }
    },

    subjectCreate: async (req, res = response) => {
        try {
            const data = req.body;
            let newSubject = await conx.addSubject(data);
            console.log('Asignatura creada correctamente');
            res.status(201).json(newSubject);
        } catch (err) {
            handleError(err, res);
        }
    },

    subjectUpdate: async (req, res = response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            let updatedSubject = await conx.updateSubject(id, data);
            if (updatedSubject.error) {
                return res.status(updatedSubject.error).json({ message: updatedSubject.message });
            }
            console.log('Asignatura actualizada correctamente');
            res.status(200).json(updatedSubject);
        } catch (err) {
            handleError(err, res);
        }
    },

    subjectDelete: async (req, res = response) => {
        try {
            const { id } = req.params;
            let deletedSubject = await conx.deleteSubject(id);
            if (deletedSubject.error) {
                return res.status(deletedSubject.error).json({ message: deletedSubject.message });
            }
            console.log('Asignatura eliminada correctamente');
            res.status(200).json(deletedSubject);
        } catch (err) {
            handleError(err, res);
        }
    },

    addProfessorToSubject: async (req, res = response) => {
        try {
            const { subjectId, userId } = req.body;
            let result = await conx.addProfessorToSubject(subjectId, userId);

            if (result.error) {
                return res.status(result.error).json({ message: result.message });
            }

            console.log('Profesor añadido a la asignatura correctamente');
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    },

    updateProfessorInSubject: async (req, res = response) => {
        try {
            const { subjectId, newUserId } = req.body;
            const result = await conx.updateProfessorToSubject(subjectId, newUserId);

            if (result.error) {
                return res.status(result.error).json({ message: result.message });
            }

            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    },

    deleteProfessorFromSubject: async (req, res = response) => {
        try {
            const { subjectId } = req.params;
            const result = await conx.deleteProfessorToSubject(subjectId);

            if (result.error) {
                return res.status(result.error).json({ message: result.message });
            }

            res.status(200).json({ message: 'Profesor eliminado de la asignatura' });
        } catch (err) {
            handleError(err, res);
        }
    }
};


export default subjects_controller;
