import { Inject, Service } from "typedi";
import { IPasswordService } from "../../password/password-interface";
import { IUserRepository } from "../../user/repositories/user-repository.interface";
import { LoginDTO, LoginResultDTO } from "../dto/login-dto";
import { IJwtService } from "../services/jwt-service.interface";
import { InMemoryUserRepository } from "core/user/repositories/user-repository.imp";
import { PasswordService } from "core/password/password-service.imp";
import { JwtService } from "../services/jwt-service.imp";

@Service()
export class LoginUsecase {
  constructor(
    @Inject(() => InMemoryUserRepository) private userRepository: IUserRepository,
    @Inject(() => PasswordService) private passwordService: IPasswordService,
    @Inject(() => JwtService) private jwtService: IJwtService
  ) {}

  async execute(login: LoginDTO): Promise<LoginResultDTO> {
    const user = await this.userRepository.findByEmail(login.email);
    if (!user) throw new Error("Invalid credentials.");

    const isPasswordMatch = this.passwordService.compare(
      login.password,
      user.hashedPassword
    );
    if (!isPasswordMatch) throw new Error("Invalid credentials.");

    return this.jwtService.generateToken({
      id: user.id!,
      ...user,
    });
  }
}
