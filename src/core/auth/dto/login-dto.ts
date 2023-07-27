import { ReadUserDTO } from "../../user/dto/user-dto"

export interface LoginDTO {
  email: string
  password: string
}

export interface LoginResultDTO {
  accessToken: string
  refreshToken: string
  user: ReadUserDTO
}