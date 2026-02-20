import User from '../models/User.js';
import bcrypt from 'bcrypt';

const createDoctor = async (data) => {
    const password = data.password || 'doctor@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new User({
        ...data,
        password: hashedPassword,
        role: 'doctor',
    });

    await doctor.save();

    return {
        success: true,
        message: 'Doctor created successfully',
    };
};


const changePassword = async (userId, oldPassword, newPassword) => {
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

    if(data.workingHours){
        throw new Error('User dedicated endpoint to update working hours');
    }
    if(data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const doctor = await User.findOneAndUpdate(
        { _id: id, role: 'doctor' },
        data,
        { new: true, runValidators: true }
    );

    if(!doctor) throw new Error('Doctor not found');

    return doctor;
};

const deleteDoctor = async (id) => {
    const doctor = await User.findOneAndDelete({ _id: id, role: 'doctor' });
    if(!doctor) throw new Error('Doctor not found');

    return { message: 'Doctor deleted successfully' };
};

const updateWorkingHours = async (doctorId, workingHours) => {

    const doctor = await User.findOne({
        _id: doctorId,
        role: 'doctor'
    });

    if (!doctor) throw new Error("Doctor not found");

    doctor.workingHours = workingHours;

    await doctor.save();

    return {
        message: "Working hours updated successfully"
    };
};

export default{
  createDoctor,
  changePassword,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  updateWorkingHours
};