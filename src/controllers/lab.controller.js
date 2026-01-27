import labService from "../services/lab.service.js";

const createLabtechnician = async (req, res) => {
    try {
        const technician = await labService.createLabtechnician(req.body);
        res.status(201).json(technician);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await labService.changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getLabtechnicians = async (req, res) => {
    try {
        const technician = await labService.getLabtechnicians();
        res.json(technician);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateLabtechnician = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await labService.updateLabtechnician(id, req.body);
        res.json(technician);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteLabtechnician = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await labService.deleteLabtechnician(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    createLabtechnician,
    changePassword,
    getLabtechnicians,
    updateLabtechnician,
    deleteLabtechnician
};