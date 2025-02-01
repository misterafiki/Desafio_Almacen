import { response, request } from 'express';
import { ConexionSubjectGrups as Conexion } from '../databases/conexion_subject_grups.js';
import { handleError } from '../helpers/handleErrors.js';

const conx = new Conexion();

const subject_grups_controller = { 
    getTeacherIdBySubjectId: async (req, res = response) => {
        const subjectId = req.params.subjectId;
        try {
            const result = await conx.getTeacherIdBySubjectId(subjectId);
            
            if (result.code !== 200) {
                return res.status(result.code).json({ message: result.message });
            }

            console.log('Profesor encontrado para la asignatura');
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    },

    getTeacherById: async (req, res = response) => {
        const teacherId = req.params.teacherId;
        try {
            const result = await conx.getTeacherById(teacherId);
            
            if (result.code !== 200) {
                return res.status(result.code).json({ message: result.message });
            }

            console.log('Datos del profesor obtenidos correctamente');
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    }
};

export default subject_grups_controller;
