import { Service } from "typedi";
import { Car } from "../entities/car.entity";
import { ICarRepository } from "./car-repository.interface";

@Service()
export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = []

  async save(car: Car): Promise<Car> {
    const existingCar = this.cars.some(c => c.id == car.id)
    if (existingCar) {
      throw new Error(`Car with id ${car.id} already exists.`)
    }
    this.cars.push(car)
    return car
  }

  async getAll(): Promise<Car[]> {
    return this.cars
  }
}