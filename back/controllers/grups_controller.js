import { response, request } from 'express';
import { ConexionGrup as Conexion } from '../databases/conexion_grup.js';
import { handleError } from '../helpers/handleErrors.js';

const conx = new Conexion();

const grups_controller = {
     getGrups: async (req, res) => {
        try {
            const grups = await Grup.findAll(); // Suponiendo que estás usando Sequelize
            res.json(grups);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los grupos', error });
        }
    },
    addTutorToGrup: async (req = request, res = response) => {
        try {
            const { grupId, userId } = req.body;
            const tutor = await conx.addTutorToGrup(grupId, userId);
            if (tutor.error) {
                return res.status(tutor.error).json({ message: tutor.message });
            }
            res.status(201).json(tutor);
        } catch (err) {
            handleError(err, res);
        }
    },

    updateTutorToGrup: async (req = request, res = response) => {
        try {
            const { grupId, newUserId } = req.body;
            const updatedTutor = await conx.updateTutorToGrup(grupId, newUserId);
            if (updatedTutor.error) {
                return res.status(updatedTutor.error).json({ message: updatedTutor.message });
            }
            res.status(200).json(updatedTutor);
        } catch (err) {
            handleError(err, res);
        }
    },

    deleteTutorToGrup: async (req = request, res = response) => {
        try {
            const { grupId } = req.params;
            const result = await conx.deleteTutorToGrup(grupId);
            if (result.error) {
                return res.status(result.error).json({ message: result.message });
            }
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    },

    addGrup: async (req = request, res = response) => {
        try {
            const data = req.body;
            const grup = await conx.addGrup(data);
            res.status(201).json(grup);
        } catch (err) {
            handleError(err, res);
        }
    },

    updateGrup: async (req = request, res = response) => {
        try {
            const { grupId } = req.params;
            const data = req.body;
            const grup = await conx.updateGrup(grupId, data);
            if (grup.error) {
                return res.status(grup.error).json({ message: grup.message });
            }
            res.status(200).json(grup);
        } catch (err) {
            handleError(err, res);
        }
    },

    deleteGrup: async (req = request, res = response) => {
        try {
            const { grupId } = req.params;
            const result = await conx.deleteGrup(grupId);
            if (result.error) {
                return res.status(result.error).json({ message: result.message });
            }
            res.status(200).json(result);
        } catch (err) {
            handleError(err, res);
        }
    }
};

export default grups_controller;