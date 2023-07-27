import jwt from "jsonwebtoken";
import { LoginResultDTO } from "../dto/login-dto";
import { IJwtService } from "./jwt-service.interface";
import { ReadUserDTO } from "../../user/dto/user-dto";
import { Service } from "typedi";

// TODO: need to generate the secret keys
const ACCESS_TOKEN_SECRET = "access-token-secret";
const REFRESH_TOKEN_SECRET = "refresh-token-secret";

@Service()
export class JwtService implements IJwtService {
  generateToken(user: ReadUserDTO): LoginResultDTO {
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  verifyAccessToken(accessToken: string): LoginResultDTO | null {
    try {
      const userId = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      return userId as LoginResultDTO;
    } catch (e) {
      return null;
    }
  }

  verifyRefreshToken(refreshToken: string): LoginResultDTO | null {
    try {
      const result = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      return result as LoginResultDTO;
    } catch (e) {
      return null;
    }
  }
}
