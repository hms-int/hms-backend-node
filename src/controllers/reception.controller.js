import receptionService from "../services/reception.service.js";

const creatReceptionist = async (req, res) => {
    try {
        const receptionist = await receptionService.creatReceptionist(req.body);
        res.status(201).json(receptionist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const result = await receptionService.changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getReceptionists = async (req, res) => {
    try {
        const receptionist = await receptionService.getReceptionists();
        res.json(receptionist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateReceptionist = async (req, res) => {
    try {
        const { id } = req.params;
        const receptionist = await receptionService.updateReceptionist(id, req.body);
        res.json(receptionist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteReceptionist = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await receptionService.deleteReceptionist(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export {
    creatReceptionist,
    changePassword,
    getReceptionists,
    updateReceptionist,
    deleteReceptionist
};