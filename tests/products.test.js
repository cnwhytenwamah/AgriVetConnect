const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("Products API", () => {
  let categoryId;
  let productId;

  // runs once before all tests in this file
  beforeAll(async () => {
    const category = await prisma.category.create({
      data: { name: "Test Category for Products", description: "temp" },
    });
    categoryId = category.id;
  });

  // runs once after all tests finish
  afterAll(async () => {
    await prisma.category.delete({ where: { id: categoryId } });
    await prisma.$disconnect();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/api/v1/products").send({
      name: "Test Product",
      description: "A test product",
      price: 1000,
      categoryId,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Test Product");

    productId = response.body.data.id;
  });

  it("should get all products", async () => {
    const response = await request(app).get("/api/v1/products");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get a product by id", async () => {
    const response = await request(app).get(`/api/v1/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(productId);
  });

  it("should return 400 for invalid product data", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send({ name: "", price: -10 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should update a product", async () => {
    const response = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send({ price: 1500 });

    expect(response.status).toBe(200);
    expect(response.body.data.price).toBe("1500");
  });

  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/v1/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
