const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function toNumber(value) {
  return typeof value === "number" ? value : Number(value);
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function getDashboardReports() {
  const [orders, payments, inventory, reviews] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        payment: true,
        items: true,
      },
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.inventory.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
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

  const today = startOfToday();

  const salesTotal = orders.reduce((sum, order) => sum + toNumber(order.totalAmount), 0);
  const paidTotal = payments
    .filter((payment) => payment.status === "SUCCESS")
    .reduce((sum, payment) => sum + toNumber(payment.amount), 0);
  const pendingPayments = payments.filter((payment) => payment.status === "PENDING").length;
  const lowStockItems = inventory.filter((item) => item.quantity <= item.reorderLevel);
  const recentOrders = orders.filter((order) => new Date(order.createdAt) >= today).length;
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  return {
    summary: {
      totalOrders: orders.length,
      totalSales: salesTotal,
      successfulPayments: payments.filter((payment) => payment.status === "SUCCESS").length,
      paymentValue: paidTotal,
      pendingPayments,
      lowStockCount: lowStockItems.length,
      reviewsCount: reviews.length,
      averageRating: Number(averageRating.toFixed(1)),
      ordersToday: recentOrders,
    },
    sales: orders.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: toNumber(order.totalAmount),
      createdAt: order.createdAt,
      paymentStatus: order.payment ? order.payment.status : null,
      itemsCount: order.items.length,
    })),
    bookings: [],
    inventory: lowStockItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      product: item.product,
      quantity: item.quantity,
      reorderLevel: item.reorderLevel,
      needsReorder: item.quantity <= item.reorderLevel,
    })),
    feedback: reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      product: review.product,
    })),
  };
}

module.exports = { getDashboardReports };
