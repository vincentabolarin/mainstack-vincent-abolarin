const request = require("supertest");
const mongoose = require("mongoose");
import { startServer } from "../index.js";

let server;

beforeAll(async () => {
  server = startServer();
});

afterAll(async () => {
  server.close();
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterAll(async () => {
  jest.clearAllMocks();
});

describe("Authentication API", () => {
  it("should register a new user or show appropriate error", async () => {
    const res = await request(server).post("/auth/register").send({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      password: "password123",
    });
    expect([200, 400, 409]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 200:
        expect(res.body.message).toBe("User registered successfully");
        break;

      case 400:
        expect(res.body.message).toBe("Invalid email format");
        break;
      
      case 409:
        expect(res.body.message).toBe("Email already exists");
        break;

      default:
        break;
    }
  });

  it("should login a user and return a token or show appropriate error", async () => {
    const res = await request(server).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect([200, 401]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 200:
        expect(res.body.data.token).toBeDefined();
        expect(res.body.message).toBe("Successfully logged in");
        break;

      case 401:
        expect(res.body.message).toBe("Invalid credentials");
        break;

      default:
        break;
    }
  });
});
