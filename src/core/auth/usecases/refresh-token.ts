import { Inject, Service } from "typedi";
import { JwtService } from "../services/jwt-service.imp";
import { IJwtService } from "../services/jwt-service.interface";
import { InMemoryUserRepository } from "core/user/repositories/user-repository.imp";
import { IUserRepository } from "core/user/repositories/user-repository.interface";

@Service()
export class RefreshTokenUsecase {
  constructor(
    @Inject(() => JwtService) private jwtService: IJwtService,
    @Inject(() => InMemoryUserRepository) private userRepo: IUserRepository
  ) {}

  async execute(refreshToken: string) {
    const decodedPayload = this.jwtService.verifyRefreshToken(refreshToken);
    console.log(decodedPayload)
    if (!decodedPayload) throw new Error("Invalid refresh token.");

    const { email } = decodedPayload;
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid refresh token.");
    return this.jwtService.generateToken({
      id: user.id!,
      email: user.email,
      name: user.name,
    });
  }
}
