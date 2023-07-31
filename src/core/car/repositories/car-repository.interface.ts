import { Car } from "../entities/car.entity";

export interface ICarRepository {
  save(car: Car): Promise<Car>
  getAll(): Promise<Car[]>
}