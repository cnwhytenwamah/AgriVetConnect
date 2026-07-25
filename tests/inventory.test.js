const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("Inventory API", () => {
  let categoryId;
  let productId;

  beforeAll(async () => {
    const category = await prisma.category.create({
      data: { name: "Test Category for Inventory", description: "temp" },
    });
    categoryId = category.id;

    const product = await prisma.product.create({
      data: {
        name: "Test Product for Inventory",
        price: 1000,
        categoryId,
      },
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.inventory.deleteMany({ where: { productId } });
    await prisma.product.delete({ where: { id: productId } });
    await prisma.category.delete({ where: { id: categoryId } });
    await prisma.$disconnect();
  });

  it("should create a new inventory record", async () => {
    const response = await request(app).post("/api/v1/inventory").send({
      productId,
      quantity: 50,
      reorderLevel: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.productId).toBe(productId);
  });

  it("should get all inventory", async () => {
    const response = await request(app).get("/api/v1/inventory");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get inventory by productId", async () => {
    const response = await request(app).get(`/api/v1/inventory/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.data.productId).toBe(productId);
  });

  it("should update inventory", async () => {
    const response = await request(app)
      .put(`/api/v1/inventory/${productId}`)
      .send({ quantity: 30 });

    expect(response.status).toBe(200);
    expect(response.body.data.quantity).toBe(30);
  });

  it("should delete inventory", async () => {
    const response = await request(app).delete(
      `/api/v1/inventory/${productId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
