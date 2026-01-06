import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createLabtechnician = async (req,res) => {
    try {
        const password = req.body.password || 'labtech@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const technician = new User({
            ...req.body,
            password: hashedPassword,
            role: 'lab-technician'
        });

        await technician.save();
        res.status(201).json(technician);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};

const changePassword = async (req,res) => {
    try {
        const technician = await User.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;

        const isMatch = await bcrypt.compare(oldPassword, technician.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        technician.password = await bcrypt.hash(newPassword, 10);
        await technician.save();

        res.status(200).json({ message: 'Password updated successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLabtechnicians = async (req,res) => {
    try {
        const technician = await User.find({ role: 'lab-technician' });
        res.json(technician);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateLabtechnician = async (req,res) => {
    try {
        const { id } = req.params;
        
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const technician = await User.findOneAndUpdate(
            { _id: id, role: 'lab-technician' },
            req.body,
            { new: true, runValidators: true }
        );

        if (!technician) {
            return res.status(404).json({ message: 'Lab technician not found'});
        }

        res.json(technician);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteLabtechnician = async (req,res) => {
    try {
        const { id } = req.params;

        const technician = await User.findOneAndDelete({ _id: id, role: 'lab-technician' });

        if(!technician) {
            return res.status(404).json({ message: 'Lab technician not found' });
        }

        res.json({ message: 'Lab technician deleted successfully' });
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