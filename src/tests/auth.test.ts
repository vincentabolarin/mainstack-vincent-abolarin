const request = require("supertest");
import app from "../index.js";

describe("Authentication API", () => {
  it("should register a new user or show appropriate error", async () => {
    const res = await request(app).post("/auth/register").send({
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
    const res = await request(app).post("/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect([200, 401]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 200:
        expect(res.body.data).toBeDefined();
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
