import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createDoctor = async (data) => {
    const password = data.password || 'doctor@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const doctor = new User({
        ...data,
        password: hashedPassword,
        role: 'Doctor',
    });

    return await doctor.save();
};

const changePassword = async (oldPassword, newPassword) => {
    const doctor = await User.findById(userId);
    if(!doctor) throw new Error('Doctor not found');

    const isMatch = await bcrypt.compare(oldPassword, doctor.password);
    if(!isMatch) throw new Error('Old password is incorrect');

    doctor.password = await bcrypt.hash(newPassword, 10);
    await doctor.save();

    return { message: 'Password changed successfully' };
};

const getDoctors = async () => {
    return await User.find({ role: 'doctor' });
};

const updateDoctor = async (id, data) => {
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const doctor = await User.findOneAndUpdate(
        { _id: id, role: 'doctor' },
        data,
        { new: true, runvalidators: true }
    );

    if(!doctor) throw new Error('Doctor not found');

    return doctor;
};

const deleteDoctor = async (id) => {
    const doctor = await User.findOneAndDelete({ _id: id, role: 'doctor' });
    if(!doctor) throw new Error('Doctor not found');

    return { message: 'Doctor deleted successfully' };
};

export default{
  createDoctor,
  changePassword,
  getDoctors,
  updateDoctor,
  deleteDoctor
};