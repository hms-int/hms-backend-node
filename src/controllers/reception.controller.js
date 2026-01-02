import User from '../models/User.js';
import bcrypt from 'bcrypt';

const creatReceptionist = async (req, res) =>{
    try{
        const password = req.body.password || 'reception@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const receptionist = new User({
            ...req.body,
            password: hashedPassword,
            role: 'receptionist'
        });

        await receptionist.save();
        res.status(201).json(receptionist);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

const changePassword = async (req, res) => {
    try {
        const receptionist = await User.findById(req.user.id);
        const {oldPassword, newPassword} = req.body;

        const isMatch = await bcrypt.compare(oldPassword, receptionist.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect"});

        receptionist.password = await bcrypt.hash(newPassword, 10);
        await receptionist.save();

        res.status(200).json({ message: "Password updated successfully" });        
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const getReceptionist = async (req, res) => {
    try {
        const receptionist = await User.find({ role: 'receptionist'});
        res.json(receptionist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateReceptionist = async (req, res) => {
    try {
        const { id } = req.params;

        if(res.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const receptionist = await User.findOneAndUpdate(
            { _id: id, role: 'receptionist' },
            req.body,
            { new: true, runValidators: true }
        );

        if (!receptionist){
            return res.status(404).json({ message: 'Receptionist not found' });
        }

        res.json(receptionist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteReceptionist = async (req, res) => {
    try{
        const { id } = req.params;

        const receptionist = await User.findOneAndDelete({ _id: id, role: 'receptionist' });
        
        if (!receptionist) {
            return res.status(404).json({ message: "Receptionist not found" });
        }

        res.json({ message: "Receptionist deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    creatReceptionist,
    changePassword,
    getReceptionist,
    updateReceptionist,
    deleteReceptionist
};