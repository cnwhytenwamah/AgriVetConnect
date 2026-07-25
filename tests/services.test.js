const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("Services API", () => {
  let serviceId;

  it("should create a new service", async () => {
    const response = await request(app).post("/api/v1/services").send({
      name: "Test Service",
      description: "A test service",
      price: 3000,
      durationMinutes: 30,
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe("Test Service");

    serviceId = response.body.data.id;
  });

  it("should get all services", async () => {
    const response = await request(app).get("/api/v1/services");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get a service by id", async () => {
    const response = await request(app).get(`/api/v1/services/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(serviceId);
  });

  it("should return 400 for invalid service data", async () => {
    const response = await request(app)
      .post("/api/v1/services")
      .send({ name: "", price: -10 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should update a service", async () => {
    const response = await request(app)
      .put(`/api/v1/services/${serviceId}`)
      .send({ price: 3500 });

    expect(response.status).toBe(200);
    expect(response.body.data.price).toBe("3500");
  });

  it("should delete a service", async () => {
    const response = await request(app).delete(`/api/v1/services/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
