# AgriVet Connect — Team Structure & Project Folder Layout

**Project Title:** AgriVet Connect: Veterinary Service Booking and Agricultural Supply Management Platform

**Team:**
- Nwamah Clinton, C — BAD/2026/TC-7/0037
- Odusanya Abayomi — BAD/2026/TC-7/0074
- Oseni Tomiwa Hammed — BAD/2026/TC-7/0139

**Stack:** Node.js, Express.js, TypeScript, PostgreSQL, Prisma, JWT + bcrypt, Zod/Joi, Multer, Swagger/OpenAPI, Git & GitHub

---

## Team Split (3 people)

Work is split by **module ownership**, following the natural boundaries in the proposal (auth/users vs. services/products vs. commerce/payments), so each person can build and test their slice independently and merge via Git.

| Member | Owns | Modules |
|---|---|---|
| **Nwamah Clinton, C** | Foundation & Identity | Project setup, DB schema (Prisma), Auth (JWT/bcrypt), Users, Roles & RBAC, Validation middleware, Error handling, Logging, Swagger setup |
| **Odusanya Abayomi** | Services & Catalog | Veterinary Services, Appointments (book/reschedule/cancel), Categories, Products, Inventory management |
| **Oseni Tomiwa Hammed** | Commerce & Reporting | Cart, Orders & Order Items, Payments (simulated), Reviews, Reports (sales/bookings/inventory), Email notifications |

### Timeline alignment

- **Day 1–3:** Clinton's scope — project setup, database design, authentication
- **Day 4–7:** Abayomi's scope — veterinary services, appointments, products, inventory
- **Day 8–11:** Tomiwa's scope — cart, orders, payments, reporting
- **Day 12–14:** Everyone — testing, documentation, bug fixes, deployment

### Git workflow suggestion

One branch per module owner (`feature/auth`, `feature/appointments`, `feature/orders`), PR into `develop`, merge to `main` after review.

---

## Full Folder Structure

```
agrivet-connect/
│
├── prisma/
│   ├── schema.prisma                # [Clinton] Users, Roles, Services, Appointments,
│   │                                 #           Categories, Products, Inventory, Orders,
│   │                                 #           OrderItems, Payments, Reviews
│   ├── migrations/
│   └── seed.ts                      # [Clinton] seed roles, admin user, sample data
│
├── src/
│   ├── config/
│   │   ├── env.ts                   # [Clinton] env variable loader/validator
│   │   ├── db.ts                    # [Clinton] Prisma client instance
│   │   ├── swagger.ts               # [Clinton] Swagger/OpenAPI setup
│   │   └── logger.ts                # [Clinton] logging config
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/                    # [Clinton]
│   │   │   ├── auth.controller.ts   # Register, Login, Forgot/Reset Password
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.validation.ts   # Zod/Joi schemas
│   │   │   └── auth.types.ts
│   │   │
│   │   ├── users/                   # [Clinton]
│   │   │   ├── users.controller.ts  # CRUD operations
│   │   │   ├── users.service.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── users.validation.ts
│   │   │   └── users.types.ts
│   │   │
│   │   ├── roles/                   # [Clinton] Admin, Staff, Customer + RBAC
│   │   │   ├── roles.service.ts
│   │   │   └── roles.middleware.ts  # role-based authorization guard
│   │   │
│   │   ├── services/                # [Abayomi] Veterinary services
│   │   │   ├── services.controller.ts
│   │   │   ├── services.service.ts
│   │   │   ├── services.routes.ts
│   │   │   ├── services.validation.ts
│   │   │   └── services.types.ts
│   │   │
│   │   ├── appointments/            # [Abayomi]
│   │   │   ├── appointments.controller.ts  # Book, Update, Cancel, List
│   │   │   ├── appointments.service.ts
│   │   │   ├── appointments.routes.ts
│   │   │   ├── appointments.validation.ts
│   │   │   └── appointments.types.ts
│   │   │
│   │   ├── categories/              # [Abayomi] Product categories
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   └── categories.routes.ts
│   │   │
│   │   ├── products/                # [Abayomi] Catalog, search, filters
│   │   │   ├── products.controller.ts   # CRUD operations
│   │   │   ├── products.service.ts
│   │   │   ├── products.routes.ts
│   │   │   ├── products.validation.ts
│   │   │   └── products.types.ts
│   │   │
│   │   ├── inventory/                # [Abayomi]
│   │   │   ├── inventory.controller.ts
│   │   │   ├── inventory.service.ts
│   │   │   └── inventory.routes.ts
│   │   │
│   │   ├── cart/                     # [Tomiwa]
│   │   │   ├── cart.controller.ts    # Add, Update, Remove items
│   │   │   ├── cart.service.ts
│   │   │   └── cart.routes.ts
│   │   │
│   │   ├── orders/                   # [Tomiwa]
│   │   │   ├── orders.controller.ts  # Checkout, order history, status updates
│   │   │   ├── orders.service.ts
│   │   │   ├── orders.routes.ts
│   │   │   ├── orders.validation.ts
│   │   │   └── orders.types.ts       # includes OrderItems logic
│   │   │
│   │   ├── payments/                 # [Tomiwa]
│   │   │   ├── payments.controller.ts # Initialize, Verify, Payment history
│   │   │   ├── payments.service.ts
│   │   │   └── payments.routes.ts
│   │   │
│   │   ├── reviews/                  # [Tomiwa]
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.service.ts
│   │   │   └── reviews.routes.ts
│   │   │
│   │   ├── reports/                  # [Tomiwa] sales, booking, inventory reports
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   └── reports.routes.ts
│   │   │
│   │   └── notifications/            # [Tomiwa] Email notifications
│   │       ├── notifications.service.ts
│   │       └── templates/
│   │           ├── welcome.template.ts
│   │           ├── booking-confirmation.template.ts
│   │           └── order-confirmation.template.ts
│   │
│   ├── middleware/                   # [Shared — Clinton leads]
│   │   ├── auth.middleware.ts        # JWT verification
│   │   ├── error.middleware.ts       # global error handling
│   │   ├── validate.middleware.ts    # Zod/Joi request validation
│   │   ├── upload.middleware.ts      # Multer file upload config
│   │   └── pagination.middleware.ts  # pagination & filtering
│   │
│   ├── utils/                        # [Shared]
│   │   ├── apiResponse.ts
│   │   ├── apiError.ts
│   │   ├── jwt.util.ts
│   │   ├── bcrypt.util.ts
│   │   └── logger.util.ts
│   │
│   ├── routes/
│   │   └── index.ts                  # [Shared] mounts all module routes
│   │
│   ├── app.ts                        # [Clinton] Express app instance, global middleware
│   └── server.ts                     # [Clinton] server bootstrap/entry point
│
├── tests/
│   ├── auth.test.ts                  # [Clinton]
│   ├── users.test.ts                 # [Clinton]
│   ├── services.test.ts              # [Abayomi]
│   ├── appointments.test.ts          # [Abayomi]
│   ├── products.test.ts              # [Abayomi]
│   ├── inventory.test.ts             # [Abayomi]
│   ├── cart.test.ts                  # [Tomiwa]
│   ├── orders.test.ts                # [Tomiwa]
│   ├── payments.test.ts              # [Tomiwa]
│   └── reports.test.ts               # [Tomiwa]
│
├── docs/
│   └── api/                          # [Shared] Swagger/OpenAPI output
│
├── uploads/                          # [Abayomi] product images via Multer
│
├── .env.example
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── docker-compose.yml                # optional: postgres + app container
└── README.md
```

---

## Notes on the Structure

- **Modular architecture** (feature-folder style) — each module is self-contained (controller/service/routes/validation), which is exactly what lets three people work in parallel without merge conflicts.
- `prisma/schema.prisma` is the one file everyone touches early — Clinton should draft the full schema (all 10+ entities: Users, Roles, Services, Appointments, Categories, Products, Inventory, Orders, Order Items, Payments, Reviews) in Day 1–2, and the team should review it together before splitting off, since appointments, orders, and inventory all depend on it.
- Git workflow: one branch per module owner (`feature/auth`, `feature/appointments`, `feature/orders`), PR into `develop`, merge to `main` after review.

---

## Reference: Original Proposal Details

### Project Overview
AgriVet Connect is a backend-powered web application that enables livestock owners to book veterinary appointments and purchase veterinary medicines and farm supplies online through a unified platform. Administrators manage services, bookings, products, inventory, orders, payments, users and reports.

### Problem Statement
Livestock owners often rely on manual appointment booking and physical visits to purchase veterinary products, resulting in delays, poor record keeping and inefficient inventory management. This platform centralizes these processes into one digital system.

### Objectives
- Digitize veterinary appointment booking.
- Provide an online marketplace for veterinary medicines and farm supplies.
- Enable secure user authentication and role-based access.
- Manage products, inventory and customer orders.
- Generate reports for sales and bookings.
- Improve operational efficiency and customer experience.

### Target Users
- Customers (Livestock owners and farmers)
- Staff
- Administrators

### Core Features
- User registration and login using JWT authentication.
- Role-based authorization (Admin, Staff, Customer).
- Veterinary service management.
- Appointment booking, rescheduling and cancellation.
- Product catalog with categories, search and filters.
- Shopping cart and checkout.
- Order management and tracking.
- Payment integration (simulated).
- Inventory management.
- Sales, booking and inventory reports.
- Email notifications.
- API documentation using Swagger.

### Technology Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma (or course ORM)
- **Authentication:** JWT and bcrypt
- **Validation:** Zod/Joi
- **File Upload:** Multer
- **Documentation:** Swagger/OpenAPI
- **Version Control:** Git & GitHub

### Database Entities
Users, Roles, Services, Appointments, Categories, Products, Inventory, Orders, Order Items, Payments, Reviews

### REST API Modules
- **Authentication:** Register, Login, Forgot Password, Reset Password
- **Users:** CRUD operations
- **Services:** CRUD operations
- **Appointments:** Book, Update, Cancel, List
- **Products:** CRUD operations
- **Cart:** Add, Update, Remove items
- **Orders:** Checkout, Order history, Status updates
- **Payments:** Initialize, Verify and Payment history

### Backend Concepts Demonstrated
RESTful API design, CRUD operations, Authentication & Authorization, Validation, Pagination & Filtering, Database Relationships, Transactions, Error Handling, Logging, API Documentation

### Project Timeline
- **Day 1–3:** Project setup, database design, authentication.
- **Day 4–7:** Veterinary services, appointments, products and inventory.
- **Day 8–11:** Cart, orders, payments and reporting.
- **Day 12–14:** Testing, documentation, bug fixes and deployment.

### Expected Outcome
A production-ready backend API for a veterinary booking and agricultural e-commerce platform demonstrating core backend engineering concepts learned during the TechCrush Backend Development program.
