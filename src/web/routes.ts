import express from "express";

import userRoutes from "./controllers/user.controller";
import authRoutes from "./controllers/auth.controller";
import carRoutes from "./controllers/car.controller";

import { loginRequired } from "./middlewares/auth.middleware";

const router = express.Router();
router.use("/cars", carRoutes());
router.use("/users", userRoutes());
router.use("/auth", authRoutes());

router.get("/protected", loginRequired, (req, res) => {
  res.json({
    message: "hello protected route",
  });
});

export default router;
