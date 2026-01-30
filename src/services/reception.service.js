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

    return await receptionist.save();
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const receptionist = await User.findById(userId)
}