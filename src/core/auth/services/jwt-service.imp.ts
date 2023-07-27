import jwt from "jsonwebtoken";
import { LoginResultDTO } from "../dto/login-dto";
import { IJwtService } from "./jwt-service.interface";
import { ReadUserDTO } from "../../user/dto/user-dto";
import { Inject, Service } from "typedi";
import { DecodedJWT } from "./types";
import { InMemoryUserRepository } from "core/user/repositories/user-repository.imp";
import { IUserRepository } from "core/user/repositories/user-repository.interface";

// TODO: need to generate the secret keys
const ACCESS_TOKEN_SECRET = "access-token-secret";
const REFRESH_TOKEN_SECRET = "refresh-token-secret";

@Service()
export class JwtService implements IJwtService {
  constructor(
    @Inject(() => InMemoryUserRepository) private userRepo: IUserRepository
  ) {}

  generateToken(user: ReadUserDTO): LoginResultDTO {
    const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  verifyAccessToken(accessToken: string): DecodedJWT | null {
    try {
      return jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as DecodedJWT;
    } catch (e) {
      return null;
    }
  }

  verifyRefreshToken(refreshToken: string): DecodedJWT | null {
    try {
      return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as DecodedJWT ;
    } catch (e) {
      return null;
    }
  }
}
