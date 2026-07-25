const request = require("supertest");
const app = require("../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("Appointments API", () => {
  let userId;
  let serviceId;
  let appointmentId;

  beforeAll(async () => {
    const user = await prisma.user.findFirst();
    userId = user.id;

    const service = await prisma.service.create({
      data: {
        name: "Test Service for Appointments",
        price: 2000,
        durationMinutes: 20,
      },
    });
    serviceId = service.id;
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { serviceId } });
    await prisma.service.delete({ where: { id: serviceId } });
    await prisma.$disconnect();
  });

  it("should create a new appointment", async () => {
    const response = await request(app).post("/api/v1/appointments").send({
      userId,
      serviceId,
      appointmentDate: "2026-09-01T10:00:00.000Z",
      notes: "Test appointment",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("PENDING");

    appointmentId = response.body.data.id;
  });

  it("should get all appointments", async () => {
    const response = await request(app).get("/api/v1/appointments");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get an appointment by id", async () => {
    const response = await request(app).get(
      `/api/v1/appointments/${appointmentId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(appointmentId);
  });

  it("should return 400 for invalid appointment data", async () => {
    const response = await request(app)
      .post("/api/v1/appointments")
      .send({ notes: "Missing required fields" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should update appointment status", async () => {
    const response = await request(app)
      .put(`/api/v1/appointments/${appointmentId}`)
      .send({ status: "CONFIRMED" });

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("CONFIRMED");
  });

  it("should delete an appointment", async () => {
    const response = await request(app).delete(
      `/api/v1/appointments/${appointmentId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
