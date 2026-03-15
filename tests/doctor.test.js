import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';
jest.setTimeout(30000);
jest.mock('../src/models/User.js');

describe('Doctor Integration Tests', () => {
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

  describe('GET /api/users/doctors', () => {
    it('should return doctors list for admin', async () => {
      // doctorService.getDoctors() calls User.find({ role:'doctor' }).select(...).populate(...)
      User.find = jest.fn().mockResolvedValue([
        { _id: 'doc1', name: 'Dr. Test', email: 'doc@test.com', role: 'doctor' }
      ]);

      const res = await request(app)
        .get('/api/users/doctors')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      // Controller returns plain JSON from service — accept either shape
      const body = res.body;
      const doctors = body.doctors || body.data || body;
      expect(Array.isArray(doctors)).toBe(true);
    });
  });

  describe('POST /api/users/doctors', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/users/doctors')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Dr. Test' }); // missing email, pass, dept

      // In controller, error is passed to next(err) where error handler sets 500 if it's not a validation error.
      // We simulate a Mongoose validation error which might be handled as 400
      User.prototype.save = jest.fn().mockRejectedValue({ name: 'ValidationError', message: 'Missing fields' });

      expect(res.statusCode).toBe(400);
    });
  });
});
