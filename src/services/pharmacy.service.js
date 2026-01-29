import { useImperativeHandle } from 'react';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createPharmacist = async (data) => {
    const password = data.password || 'pharmacist@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const pharmacist = new User ({
       ...data,
       password: hashedPassword,
       role: 'pharmacist', 
    });

    return await pharmacist.save();
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const pharmacist = await User.findById(userId);
    if(!pharmacist) throw new Error('Pharmacist not found');

    const isMatch = await bcrypt.compare(oldPassword, pharmacist.password);
    if(!isMatch) throw new Error('Old password is incorrect');

    pharmacist.password = await bcrypt.hash(newPassword, 10);
    await pharmacist.save();

    return { message: 'Password changed successfully' };
};

const getPharmacists = async () => {
    return await User.find({ role: 'pharmacist' });
};

const updatePharmacist = async (id, data) => {
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const pharmacist = await User.findOneAndUpdate(
        { _id: id, role: 'pharmacist' },
        data,
        { new: true, runValidators: true }
    );

    if(!pharmacist) throw new Error('Pharmacist not found');

    return pharmacist;
};

const deletePharmacist = async (id) => {
    const pharmacist = await User.findOneAndDelete({ _id: id, role: 'pharmacist' });
    if(!pharmacist) throw new Error('Pharmacist not found');

    return { message: 'Pharmacist deleted successfully'};
};

export default {
    createPharmacist,
    changePassword,
    getPharmacists,
    updatePharmacist,
    deletePharmacist
};