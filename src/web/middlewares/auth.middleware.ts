import type { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { JwtService } from "core/auth/services/jwt-service.imp";

export function loginRequired(req: Request, res: Response, next: NextFunction) {
  const jwtService = Container.get(JwtService);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  const payload = jwtService.verifyAccessToken(token);
  if (!payload) return res.sendStatus(403);

  // TODO: attach user to the request
  // req.user = user
  next();
}
