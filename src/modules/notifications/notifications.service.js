const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function toNumber(value) {
  return typeof value === "number" ? value : Number(value);
}

function buildNotification(type, title, message, createdAt, meta = {}) {
  return {
    id: `${type}-${createdAt.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    title,
    message,
    createdAt,
    read: false,
    meta,
  };
}

async function listNotifications(user) {
  const [orders, payments, reviews] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        payment: true,
      },
    }),
    prisma.payment.findMany({
      where: { order: { userId: user.userId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        order: true,
      },
    }),
    prisma.review.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
  ]);

  const notifications = [
    ...orders.map((order) =>
      buildNotification(
        "order",
        `Order ${order.status.toLowerCase()}`,
        `Your order ${order.id} is currently ${order.status.toLowerCase()}.`,
        order.createdAt,
        { orderId: order.id, status: order.status }
      )
    ),
    ...payments.map((payment) =>
      buildNotification(
        "payment",
        `Payment ${payment.status.toLowerCase()}`,
        `Payment for order ${payment.orderId} is ${payment.status.toLowerCase()}.`,
        payment.createdAt,
        { orderId: payment.orderId, paymentId: payment.id, amount: toNumber(payment.amount) }
      )
    ),
    ...reviews.map((review) =>
      buildNotification(
        "review",
        "Review saved",
        `Your review for ${review.product.name} was saved.`,
        review.createdAt,
        { reviewId: review.id, productId: review.productId }
      )
    ),
  ].sort((a, b) => b.createdAt - a.createdAt);

  return {
    unreadCount: notifications.filter((notification) => !notification.read).length,
    notifications,
  };
}

module.exports = { listNotifications };
