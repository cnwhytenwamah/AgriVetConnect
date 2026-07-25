const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../utils/apiError");

const prisma = new PrismaClient();

function toNumber(value) {
  return typeof value === "number" ? value : Number(value);
}

function mapOrder(order) {
  return {
    id: order.id,
    userId: order.userId,
    totalAmount: toNumber(order.totalAmount),
    status: order.status,
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    payment: order.payment
      ? {
          id: order.payment.id,
          amount: toNumber(order.payment.amount),
          method: order.payment.method,
          status: order.payment.status,
          transactionRef: order.payment.transactionRef,
          paidAt: order.payment.paidAt,
        }
      : null,
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price: toNumber(item.price),
      product: item.product
        ? {
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            imageUrl: item.product.imageUrl,
          }
        : null,
    })),
  };
}

async function listOrders(user) {
  const where = user.roleName === "ADMIN" || user.roleName === "STAFF" ? {} : { userId: user.userId };

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      payment: true,
      items: {
        include: { product: true },
        orderBy: { id: "asc" },
      },
    },
  });

  return orders.map(mapOrder);
}

async function getOrderById(user, id) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      payment: true,
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (user.roleName !== "ADMIN" && user.roleName !== "STAFF" && order.userId !== user.userId) {
    throw new ApiError(403, "You do not have permission to view this order");
  }

  return mapOrder(order);
}

async function createOrder(userId, input) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const totalAmount = cart.items.reduce((sum, item) => sum + toNumber(item.product.price) * item.quantity, 0);

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress: input.shippingAddress,
        status: "PENDING",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return createdOrder;
  });

  return mapOrder(order);
}

async function updateOrderStatus(user, id, input) {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (user.roleName !== "ADMIN" && user.roleName !== "STAFF") {
    throw new ApiError(403, "You do not have permission to update this order");
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: input.status },
    include: {
      payment: true,
      items: {
        include: { product: true },
      },
    },
  });

  return mapOrder(updatedOrder);
}

module.exports = { listOrders, getOrderById, createOrder, updateOrderStatus };
