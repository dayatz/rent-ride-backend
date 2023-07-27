import express from "express";
import userRoutes from "./controllers/user.controller";
import authRoutes from "./controllers/auth.controller";

import Container from "typedi";
import { AuthMiddleware } from "./middlewares/auth.middleware";

const router = express.Router();
router.use("/users", userRoutes(router));
router.use("/auth", authRoutes(router));

const loginRequired = Container.get(AuthMiddleware).loginRequired
router.get("/protected", loginRequired, (req, res) => {
  res.json({
    message: "hello protected route"
  })
})

export default router;
