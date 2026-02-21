import doctorService from '../services/doctor.service.js';

const createDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    next(err)
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const result = await doctorService.changePassword(
      req.user.id, 
      oldPassword, 
      newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctors();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorService.updateDoctor(id, req.body);
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await doctorService.deleteDoctor(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMyWorkingHours = async (req, res) => {
    try {

        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: "Access denied" });
        }

        const result = await doctorService.updateWorkingHours(
            req.user.id,
            req.body.workingHours
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
  
export {
  createDoctor,
  changePassword,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  updateMyWorkingHours
};