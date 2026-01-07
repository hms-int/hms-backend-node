import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createPharmacist = async (req,res) => {
    try {
        const password = req.body.password || 'pharmacist@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const pharmacist = new User({
            ...req.body,
            password: hashedPassword,
            role: 'pharmacist'
        });

        await pharmacist.save();
        res.status(201).json(pharmacist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req,res) => {
    try {
        const pharmacist = await User.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;

        const isMatch = await bcrypt.compare(oldPassword, pharmacist.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        pharmacist.password = await bcrypt.hash(newPassword, 10);
        await pharmacist.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPharmacists = async (req,res) => {
    try {
        const pharmacist = await User.find({ role: 'pharmacist' });
        res.json(pharmacist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePharmacist = async (req,res) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);

        }

        const pharmacist = await User.findOneAndUpdate(
            { _id: id, role: 'pharmacist' },
            req.body,
            { new: true, runValidators: true }
        );

        if (!pharmacist) {
            return res.status(404).json({ message: 'Pharmacist not found' });
        }

        res.json(pharmacist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deletePharmacist = async (req,res) => {
    try {
        const { id } = req.params;

        const pharmacist = await User.findOneAndDelete({ _id: id, role: 'pharmacist' });

        if (!pharmacist) {
            return res.status(400).json({ message: 'Pharmacist not found' });
        }

        res.json({ message: 'Pharmacist deleted successfully' });
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
};