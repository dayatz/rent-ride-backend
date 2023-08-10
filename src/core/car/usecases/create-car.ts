import { Inject, Service } from "typedi";
import { Car } from "../entities/car.entity";
import { ICarRepository } from "../repositories/car-repository.interface";
import { InMemoryCarRepository } from "../repositories/car-repository.imp";
import { CreateCarDTO, ReadCarDTO } from "../dto/car.dto";
import ValidateInput from '../../lib/validation-input.decorator'

import { z } from 'zod'

const CarSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number().int().min(1900),
  isAvailalbe: z.boolean().optional()
})


@Service()
export class CreateCarUsecase {
  constructor(
    @Inject(() => InMemoryCarRepository) private carRepository: ICarRepository
  ) {}

  @ValidateInput(CarSchema)
  async execute(car: CreateCarDTO): Promise<ReadCarDTO> {
    const newCarObj = new Car(
      car.make, car.model, car.year, car.isAvailale ?? true
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