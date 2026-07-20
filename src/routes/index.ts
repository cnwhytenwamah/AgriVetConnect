import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/users.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AgriVet Connect API is running" });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;