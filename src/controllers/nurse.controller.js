import User from "../models/User.js";
import bcrypt from "bcrypt";
import nurseService from "../services/nurse.service.js";

const createNurse = async => {
    try {
        const nurse = await nurseService.createNurse(req.body);
    }
}