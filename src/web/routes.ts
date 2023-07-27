import express from "express";
import userRoutes from "./controllers/user.controller";
import authRoutes from "./controllers/auth.controller";

import { loginRequired } from "./middlewares/auth.middleware";

const router = express.Router();
router.use("/users", userRoutes(router));
router.use("/auth", authRoutes(router));

router.get("/protected", loginRequired, (req, res) => {
  res.json({
    message: "hello protected route"
  })
})

export default router;
