import { Service } from "typedi";
import { Car } from "../entities/car.entity";
import { ICarRepository } from "./car-repository.interface";
import MOCK_CARS from "./car-mocks";
import { nanoid } from "nanoid";

@Service()
export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = MOCK_CARS;

  async save(car: Car): Promise<Car> {
    const existingCar = this.cars.some(c => c.id == car.id)
    if (existingCar) {
      throw new Error(`Car with id ${car.id} already exists.`)
    }
    if (!car.id) {
      car.id = nanoid()
    }
    this.cars.push(car)
    console.log(this.cars)
    return car
  }

  async getAll(): Promise<Car[]> {
    return this.cars
  }
}