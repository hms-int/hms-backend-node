import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createNurse = async (data) => {
    const password = data.password || 'nurse@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const nurse = new User ({
        ...data,
        password :hashedPassword,
        role: 'nurse',
    });

    await nurse.save();

    return {
        success: true,
        message: 'Nurse created successfully'
    };
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const nurse = await User.findById(userId);
    if(!nurse) throw new Error('Nurse not found');

    const isMatch = await bcrypt.compare(oldPassword, nurse.password);
    if(!isMatch) throw new Error('Old password is incorrect');

    nurse.password = await bcrypt.hash(newPassword, 10);
    await nurse.save();

    return { message: 'Password changed successfully' };
};

const getNurses = async () => {
    return await User.find({ role: 'nurse' });
};

const updateNurse = async (id, data) => {
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const nurse = await User.findOneAndUpdate(
        { _id: id, role: 'nurse' },
        data,
        { new: true, runValidators: true }, 
    );

    if(!nurse) throw new Error('Nurse not found');

    return nurse;
};

const deleteNurse = async (id) => {
    const nurse = await User.findOneAndDelete({ _id: id, role: 'nurse' });
    if(!nurse) throw new Error('Nurse not found');

    return { message: 'Nurse deleted successfully' };
};

export default {
    createNurse,
    changePassword,
    getNurses,
    updateNurse,
    deleteNurse
};