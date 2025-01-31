const request = require("supertest");
import { startServer } from "../index.js";

let server;

beforeAll(async () => {
  server = startServer();
});

afterAll(async () => {
  server.close();
});

jest.mock("../middlewares/auth.js", () => ({
  authenticate: (req, res, next) => next(),
}));

describe("Products API", () => {
  let productId;

  it("should create a product or show appropriate error", async () => {
    const res = await request(server).post("/products").send({
      name: "Test Product",
      description: "This is a test product",
      price: 5000,
      category: "Electronics"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product created successfully");
    expect(res.body.data).toHaveProperty("_id");
    productId = res.body.data._id;
  });

  it("should retrieve all products", async () => {
    const res = await request(server).get("/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data.products)).toBe(true);
  });

  it("should retrieve a single product by ID or show an error", async () => {
    const res = await request(server).get(`/products/${productId}`);

    expect([200, 404]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 200:
        expect(res.body.data).toHaveProperty("_id", productId);
        break;

      case 404:
        expect(res.body.message).toBe("Product not found");
        break;

      default:
        break;
    }
  });

  it("should update a product by ID or show an error", async () => {
    const res = await request(server).put(`/products/${productId}`).send({
      name: "Updated Product",
      description: "Updated description",
      price: 149.99,
    });

    expect([200, 404]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 200:
        expect(res.body.message).toBe("Product updated successfully");
        expect(res.body.data.name).toBe("Updated Product");
        break;

      case 404:
        expect(res.body.message).toBe("Product not found");
        break;

      default:
        break;
    }
  });

  it("should delete a product by ID or show an error", async () => {
    const res = await request(server).delete(`/products/${productId}`);

    expect([204, 404]).toContain(res.statusCode);

    switch (res.statusCode) {
      case 204:
        expect(res.ok).toBe(true);
        break;

      case 404:
        expect(res.body.message).toBe("Product not found");
        break;

      default:
        break;
    }
  });

  // Delete product after all tests
  afterAll(async () => {
    await request(server).delete(`/products/${productId}`);
  });
});
