import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Billing from '../src/models/billing.js';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';
jest.setTimeout(30000);
jest.mock('../src/models/User.js');
jest.mock('../src/models/billing.js');

describe('Billing Integration Tests', () => {
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

  describe('GET /api/billing', () => {
    it('should return billing records', async () => {
      // getAllBilling: Billing.find().populate().sort().skip().limit()  +  Billing.countDocuments()
      const bills = [{ _id: 'bill1', amount: 500, status: 'pending' }];
      const limitMock = jest.fn().mockResolvedValue(bills);
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock });
      const sortMock = jest.fn().mockReturnValue({ skip: skipMock });
      const popMock = jest.fn().mockReturnValue({ sort: sortMock });
      Billing.find = jest.fn().mockReturnValue({ populate: popMock });
      Billing.countDocuments = jest.fn().mockResolvedValue(1);

      const res = await request(app)
        .get('/api/billing')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.bills)).toBe(true);
    });
  });

  describe('POST /api/billing', () => {
    it('should create a new bill', async () => {
      // createBilling uses Billing.create(...)
      const mockBill = { _id: 'bill1', patient: 'patId', amount: 1500 };
      Billing.create = jest.fn().mockResolvedValue(mockBill);

      const res = await request(app)
        .post('/api/billing')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          patient: 'patId',
          amount: 1500,
          paymentMode: 'cash',
          // appointment is optional per controller
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });
});

