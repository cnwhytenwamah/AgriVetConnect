const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../utils/apiError");

const prisma = new PrismaClient();

function toNumber(value) {
  return typeof value === "number" ? value : Number(value);
}

function toCartResponse(cart) {
  if (!cart) {
    return null;
  }

  const items = cart.items.map((item) => {
    const price = toNumber(item.product.price);
    const lineTotal = price * item.quantity;

    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      price,
      lineTotal,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        imageUrl: item.product.imageUrl,
        isActive: item.product.isActive,
      },
    };
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.lineTotal, 0);

  return {
    id: cart.id,
    userId: cart.userId,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    totalItems,
    totalAmount,
    items,
  };
}

async function getOrCreateCart(userId) {
  return prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

async function getCartSummary(userId) {
  const cart = await getOrCreateCart(userId);
  return toCartResponse(cart);
}

async function addCartItem(userId, input) {
  const quantity = Number(input.quantity ?? 1);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a positive integer");
  }

  const product = await prisma.product.findUnique({
    where: { id: input.productId },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (!product.isActive) {
    throw new ApiError(400, "This product is currently unavailable");
  }

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: input.productId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      cartId: cart.id,
      productId: input.productId,
      quantity,
    },
  });

  return getCartSummary(userId);
}

async function updateCartItem(userId, productId, input) {
  const quantity = Number(input.quantity);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a positive integer");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) {
    throw new ApiError(404, "Cart item not found");
  }

  await prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity },
  });

  return getCartSummary(userId);
}

async function removeCartItem(userId, productId) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) {
    throw new ApiError(404, "Cart item not found");
  }

  await prisma.cartItem.delete({
    where: { id: item.id },
  });

  return getCartSummary(userId);
}

async function clearCart(userId) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return getCartSummary(userId);
}

module.exports = { getCartSummary, addCartItem, updateCartItem, removeCartItem, clearCart };
