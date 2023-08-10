import { Inject, Service } from "typedi";

import { User } from "../entities/user.entity";
import { IPasswordService } from "../../password/password-interface";
import { CreateUserDTO, ReadUserDTO } from "../dto/user-dto";
import { IUserRepository } from "../repositories/user-repository.interface";
import { PasswordService } from "core/password/password-service.imp";
import { InMemoryUserRepository } from "../repositories/user-repository.imp";

@Service()
export default class RegisterUserUsecase {
  constructor(
    @Inject(() => InMemoryUserRepository) private userRepository: IUserRepository,
    @Inject(() => PasswordService) private passwordService: IPasswordService
  ) {}

  async execute(user: CreateUserDTO): Promise<ReadUserDTO> {
    const hashedPassword = this.passwordService.hash(user.password);
    const u = new User(user.name, user.email, hashedPassword);
    const createdUser = await this.userRepository.save(u); // now the user has id
    return {
      id: createdUser.id!, // user entity will always have id once it's saved
      name: createdUser.name,
      email: createdUser.email,
    };
  }
}
