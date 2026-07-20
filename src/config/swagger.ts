import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgriVet Connect API",
      version: "1.0.0",
      description:
        "Backend API for AgriVet Connect — a platform connecting livestock owners with veterinary services and agricultural supplies.",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/modules/**/*.routes.ts"], // scans route files for JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options);