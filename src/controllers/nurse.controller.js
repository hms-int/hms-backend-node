import User from "../models/User";
import bcrypt from "bcrypt";

const createNurse= async (req, res) => {
    try {
        const password= req.body.password || 'nurse@123';
        const hashedPassword= await bcrypt.hash(password, 10);

        const nurse= new User({
            ...req.body,
            password: hashedPassword,
            role: 'nurse'
        });
        await nurse.save();
        res.status(201).json(nurse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const nurse= await User.findById(req.user.id);
        const { oldPassword, newPassword }= req.body;

        const isMatch= await bcrypt.compare(oldPassword, nurse.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getNurses = async (req, res) => {
    try {
        const nurses=await User.find({ role: 'nurse' });
        res.json(nurses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateNurse = async (req,res) =>{
    try{
        const { id }= req.params;
    
    if (req.body.password){
    req.body.password=await bcrypt.hash(req.body.password, 10);
    }

    const nurse = await User.findOneAndUpdate(
        { _id: id, role: 'nurse'},
        req.body,
        { new: true, runValidators: true}
    );

    if(!nurse){
        return res.status(404).json({ message: 'Nurse not found' });
    }

    res.json(nurse);
    } catch(error) {
        res.status(400).json({ message: err.message });
    }
};   

export { 
    createNurse,
    changePassword,
    getNurses,
    updateNurse
};