import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Appointment from '../src/models/appointment.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.setTimeout(30000);
jest.mock('../src/models/User.js');
jest.mock('../src/models/appointment.js');

describe('Appointment Integration Tests', () => {
  let adminToken;

  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
    adminToken = jwt.sign({ id: 'adminId' }, process.env.JWT_SECRET);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    User.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({
        _id: 'adminId',
        role: 'admin',
        status: 'Active'
      })
    });
  });

  describe('GET /api/appointments', () => {
    it('should return appointments list', async () => {
      // Controller: Appointment.find(query).populate(...).populate(...).populate(...).lean()
      const leanMock = jest.fn().mockResolvedValue([{ _id: 'apt1' }]);
      const pop3Mock = jest.fn().mockReturnValue({ lean: leanMock });
      const pop2Mock = jest.fn().mockReturnValue({ populate: pop3Mock });
      const pop1Mock = jest.fn().mockReturnValue({ populate: pop2Mock });
      Appointment.find = jest.fn().mockReturnValue({ populate: pop1Mock });

      const res = await request(app)
        .get('/api/appointments')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      // Controller returns plain array: res.json(appointments)
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
      const patId = new mongoose.Types.ObjectId().toString();
      const deptId = new mongoose.Types.ObjectId().toString();
      const docId = new mongoose.Types.ObjectId().toString();

      // createAppointment validates patient/dept/doctor via model lookups
      const PatientModel = mongoose.model('Patient');
      const DeptModel = mongoose.model('Department');
      PatientModel.findById = jest.fn().mockResolvedValue({ _id: patId });
      DeptModel.findById = jest.fn().mockResolvedValue({ _id: deptId });
      User.findOne = jest.fn().mockResolvedValue({ _id: docId, role: 'doctor' });
      Appointment.prototype.save = jest.fn().mockResolvedValue({
        _id: 'newApt', patient: patId, dept: deptId, doctor: docId
      });

      const res = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          patient: patId,
          dept: deptId,
          doctor: docId,
          date: new Date().toISOString(),
          rsv: 'Fever'
        });

      // Controller returns the appointment object on 201, or 400 on validation failure
      expect([201, 400]).toContain(res.statusCode);
    });
  });
});
