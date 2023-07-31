import { Inject, Service } from "typedi";
import { Car } from "../entities/car.entity";
import { ICarRepository } from "../repositories/car-repository.interface";
import { InMemoryCarRepository } from "../repositories/car-repository.imp";
import { CreateCarDTO, ReadCarDTO } from "../dto/car.dto";

@Service()
export class CreateCarUsecase {
  constructor(
    @Inject(() => InMemoryCarRepository) private carRepository: ICarRepository
  ) {}

  async execute(car: CreateCarDTO): Promise<ReadCarDTO> {
    const newCarObj = new Car(
      car.make, car.model, car.year, true
    )
    const savedCar = await this.carRepository.save(newCarObj)
    return {
      id: savedCar.id!,
      make: savedCar.make,
      model: savedCar.model,
      year: savedCar.year,
      isAvailale: savedCar.isAvailale
    }
  }
}