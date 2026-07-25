const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../utils/apiError");

const prisma = new PrismaClient();

function toNumber(value) {
  return typeof value === "number" ? value : Number(value);
}

function mapPayment(payment) {
  return {
    id: payment.id,
    orderId: payment.orderId,
    amount: toNumber(payment.amount),
    method: payment.method,
    status: payment.status,
    transactionRef: payment.transactionRef,
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}

async function listPayments(user) {
  const where = user.roleName === "ADMIN" || user.roleName === "STAFF" ? {} : { order: { userId: user.userId } };

  const payments = await prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return payments.map(mapPayment);
}

async function initializePayment(userId, input) {
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: {
      payment: true,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.userId !== userId) {
    throw new ApiError(403, "You do not have permission to pay for this order");
  }

  if (order.payment) {
    throw new ApiError(409, "This order already has a payment record");
  }

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: order.totalAmount,
      method: input.method,
      status: "PENDING",
    },
  });

  return mapPayment(payment);
}

async function verifyPayment(user, id, input) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });

  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (user.roleName !== "ADMIN" && user.roleName !== "STAFF" && payment.order.userId !== user.userId) {
    throw new ApiError(403, "You do not have permission to verify this payment");
  }

  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: {
      status: "SUCCESS",
      transactionRef: input.transactionRef,
      paidAt: new Date(),
    },
  });

  await prisma.order.update({
    where: { id: payment.orderId },
    data: {
      status: "PROCESSING",
    },
  });

  return mapPayment(updatedPayment);
}

module.exports = { listPayments, initializePayment, verifyPayment };
