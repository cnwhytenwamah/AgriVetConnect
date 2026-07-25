const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../utils/apiError");

const prisma = new PrismaClient();

async function listReviews(user) {
  const where = user.roleName === "ADMIN" || user.roleName === "STAFF" ? {} : { userId: user.userId };

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return reviews.map((review) => ({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    product: review.product,
    user: review.user,
  }));
}

async function createReview(userId, input) {
  const product = await prisma.product.findUnique({
    where: { id: input.productId },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: input.productId,
      },
    },
  });

  if (existingReview) {
    throw new ApiError(409, "You have already reviewed this product");
  }

  const review = await prisma.review.create({
    data: {
      userId,
      productId: input.productId,
      rating: input.rating,
      comment: input.comment,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return review;
}

async function updateReview(userId, id, input) {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId !== userId) {
    throw new ApiError(403, "You do not have permission to update this review");
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: {
      ...(input.rating !== undefined ? { rating: input.rating } : {}),
      ...(input.comment !== undefined ? { comment: input.comment } : {}),
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return updatedReview;
}

async function deleteReview(userId, id) {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId !== userId) {
    throw new ApiError(403, "You do not have permission to delete this review");
  }

  await prisma.review.delete({
    where: { id },
  });
}

module.exports = { listReviews, createReview, updateReview, deleteReview };
