import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "AgriVet Connect API is running" });
});

export default router;