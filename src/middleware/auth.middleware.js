const { verifyToken } = require("../utils/jwt.util");
const { ApiError } = require("../utils/apiError");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.roleName)) {
      return next(new ApiError(403, "You do not have permission to perform this action"));
    }
    next();
  };
}

module.exports = { authenticate, authorize };