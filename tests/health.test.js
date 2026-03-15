import request from "supertest";
import app from "../src/app.js";
import { jest } from '@jest/globals';
jest.setTimeout(30000);
describe("Health Route", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});