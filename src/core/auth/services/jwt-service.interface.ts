import { ReadUserDTO } from "../../user/dto/user-dto"
import { LoginResultDTO } from "../dto/login-dto"

export interface IJwtService {
  generateToken(payload: ReadUserDTO): LoginResultDTO
  verifyAccessToken(accessToken: string): LoginResultDTO | null
  verifyRefreshToken(refreshToken: string): LoginResultDTO | null
}