import User from '../models/User.js';
import bcrypt from 'bcrypt';
import doctorService from './doctor.service.js';

const createLabtechnician = async (data) => {
        const password = data.password || 'labtech@123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const technician = new User({
            ...data,
            password: hashedPassword,
            role: 'lab-technician'
        });

        return await technician.save();
};

const changePassword = async (userId,oldPassword, newPassword) => {
    const technician = await User.findById(userId);
    if(!technician) throw new Error('Lab technician not found');

    const isMatch = await bcrypt.compare(oldPassword, technician.password);
    if(!isMatch) throw new Error('Old password is incorrect');

    technician.password = await bcrypt.hash(newPassword, 10);
    await technician.save();

    return { message: 'Password changes successfully' };
};

const getLabtechnicians = async () => {
    return await User.find({ role: 'lab-technician' });
};

const updateLabtechnician = async(id, data) => {
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const technician = await User.findOneAndUpdate(
        { _id: id, role: 'lab-technician' },
        data,
        { new: true, runValidators: true }
    );

    if(!technician) throw new Error('Lab technician not found');

    return technician;
};

const deleteLabtechnician = async (id) => {
    const technician = await User.findOneAndDelete(
        { _id: id, role: 'lab-technician' }
    );
    if(!technician) throw new Error('Lab technician not found');

    return { message: 'Lab technician deleted successfully' };
}

export default{
    createLabtechnician,
    changePassword,
    getLabtechnicians,
    updateLabtechnician,
    deleteLabtechnician
};