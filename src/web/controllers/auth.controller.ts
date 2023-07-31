import type { Request, Response } from "express";
import { Router } from "express";
import Container, { Inject, Service } from "typedi";

import { LoginUsecase } from "core/auth/usecases/login";
import { LoginDTO } from "core/auth/dto/login-dto";
import { RefreshTokenUsecase } from "core/auth/usecases/refresh-token";

@Service()
export class AuthController {
  constructor(
    @Inject(() => LoginUsecase) private loginUsecase: LoginUsecase,
    @Inject(() => RefreshTokenUsecase)
    private refreshTokenUsecase: RefreshTokenUsecase
  ) {
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  async login(req: Request<{}, {}, LoginDTO>, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await this.loginUsecase.execute({ email, password });
      res.json(result);
    } catch (e) {
      if (e instanceof Error)
        res.status(401).json({
          message: e.message,
        });
    }
  }

  async refreshToken(
    req: Request<{}, {}, { refreshToken: string }>,
    res: Response
  ) {
    const { refreshToken } = req.body;
    const result = await this.refreshTokenUsecase.execute(refreshToken);
    res.json(result);
  }
}

export default function mountToRoutes() {
  const router = Router();
  const userController = Container.get(AuthController);
  router.post("/login", userController.login);
  router.post("/refresh-token", userController.refreshToken);
  return router;
}
