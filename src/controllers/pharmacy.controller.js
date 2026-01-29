import pharmacyService from "../services/pharmacy.service.js";

const createPharmacist = async (req, res) => {
    try {
        const pharmacist = await pharmacyService.createPharmacist(req.body);
        res.status(201).json(pharmacist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword }= req.body;
        const result = await pharmacyService.changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getPharmacists = async (req, res) => {
    try {
        const pharmacists = await pharmacyService.getPharmacists();
        res.json(pharmacists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePharmacist = async (req, res) => {
    try {
        const { id } = req.params;
        const pharmacist = await pharmacyService.updatePharmacist(id, req.body);
        res.json(pharmacist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePharmacist = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pharmacyService.deletePharmacist(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    createPharmacist,
    changePassword,
    getPharmacists,
    updatePharmacist,
    deletePharmacist
}

