import User from '../models/User.js';
import bcrypt from 'bcrypt';

const creatReceptionist = async (data) => {
    const password = data.password || 'reception@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const receptionist = new User({
        ...data,
        password: hashedPassword,
        role: 'receptionist'
    });

    await receptionist.save();

    return {
        success: true,
        message: 'Receptionist created successfully'
    };
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const receptionist = await User.findById(userId);
    if(!receptionist) throw new Error('Receptionist not found');

    const isMatch = await bcrypt.compare(oldPassword, receptionist.password);
    if(!isMatch) throw new Error('Old password is incorrect');

    receptionist.password = await bcrypt.hash(newPassword, 10);
    await receptionist.save();

    return { message: 'Password changes successfully' };
};

const getReceptionists = async () => {
    return await User.find({ role: 'receptionist' });
};

const updateReceptionist = async (id, data) => {
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const receptionist = await User.findOneAndUpdate(
        { _id: id, role: 'receptionist' },
        data,
        { new: true, runValidators:true }
    );

    if(!receptionist) throw new Error('Receptionist not found');

    return receptionist;
};

const deleteReceptionist = async (id) => {
    const receptionist = await User.findOneAndDelete(
        { _id: id, role: 'receptionist' }
    );

    if(!receptionist) throw new Error('Receptionist not found');

    return { message: 'Receptionist deleted successfully' };
};

export default {
    creatReceptionist,
    changePassword,
    getReceptionists,
    updateReceptionist,
    deleteReceptionist
};