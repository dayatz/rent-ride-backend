import { Inject, Service } from "typedi";
import { InMemoryCarRepository } from "../repositories/car-repository.imp";
import { ICarRepository } from "../repositories/car-repository.interface";

@Service()
export class GetAllCarsUsecase {
  constructor(
    @Inject(() => InMemoryCarRepository) private carRepository: ICarRepository
  ) {}

  async execute() {
    return await this.carRepository.getAll()
  }
}