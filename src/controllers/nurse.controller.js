import User from "../models/User.js";
import bcrypt from "bcrypt";
import nurseService from "../services/nurse.service.js";

const createNurse = async (req, res) => {
    try {
        const nurse = await nurseService.createNurse(req.body);
        res.status(201).json(nurse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await nurseService.changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getNurses = async (req, res) => {
    try {
        const nurses = await nurseService.getNurses();
        res.json(nurses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateNurse = async (req, res) => {
    try {
        const { id } = req.params;
        const nurse = await nurseService.updateNurse(id, req.body);
        res.json(nurse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteNurse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await nurseService.deleteNurse(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    createNurse,
    changePassword,
    getNurses,
    updateNurse,
    deleteNurse
};