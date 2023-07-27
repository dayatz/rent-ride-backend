import type { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";

import { JwtService } from "core/auth/services/jwt-service.imp";
import { IJwtService } from "core/auth/services/jwt-service.interface";

@Service()
export class AuthMiddleware {
  constructor(@Inject(() => JwtService) private jwtService: IJwtService) {
    this.loginRequired = this.loginRequired.bind(this);
  }

  loginRequired(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    const payload = this.jwtService.verifyAccessToken(token);
    if (!payload) return res.sendStatus(403);

    // TODO: attach user to the request
    // req.user = user
    next();
  }
}
