const { registerUser, loginUser } = require("./auth.service");
const { sendSuccess } = require("../../utils/apiResponse");

async function register(req, res, next) {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, 201, "User registered successfully", result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };