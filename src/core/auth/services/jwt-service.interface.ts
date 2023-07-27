import { ReadUserDTO } from "../../user/dto/user-dto"
import { LoginResultDTO } from "../dto/login-dto"
import { DecodedJWT } from "./types"

export interface IJwtService {
  generateToken(payload: ReadUserDTO): LoginResultDTO
  verifyAccessToken(accessToken: string): DecodedJWT | null
  verifyRefreshToken(refreshToken: string): DecodedJWT | null
}