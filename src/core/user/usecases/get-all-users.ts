import { Inject, Service } from "typedi";

import { User } from "../entities/user.entity";
import { CreateUserDTO, ReadUserDTO } from "../dto/user-dto";
import { IUserRepository } from "../repositories/user-repository.interface";
import { PasswordService } from "core/password/password-service.imp";
import { InMemoryUserRepository } from "../repositories/user-repository.imp";

@Service()
export default class GetAllUserUsecase {
  constructor(
    @Inject(() => InMemoryUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<ReadUserDTO[]> {
    const usersDb = await this.userRepository.getAll()
    return usersDb.map(user => ({
      id: user.id!,
      name: user.name,
      email: user.email,
    }))
  }
}
