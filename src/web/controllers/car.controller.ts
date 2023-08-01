import { Router, type Request, type Response } from "express";
import { CreateCarUsecase } from "core/car/usecases/create-car";
import Container, { Inject, Service } from "typedi";
import { GetAllCarsUsecase } from "core/car/usecases/get-all-cars";
import { CreateCarDTO } from "core/car/dto/car.dto";

@Service()
export class CarController {
  constructor(
    @Inject(() => CreateCarUsecase) private createCarUsecase: CreateCarUsecase,
    @Inject(() => GetAllCarsUsecase) private getAllCarUsecase: GetAllCarsUsecase
  ) {
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
  }

  async get(req: Request, res: Response) {
    console.log("get all cars")
    res.json(await this.getAllCarUsecase.execute())
  }

  async post(req: Request<{}, {}, CreateCarDTO>, res: Response) {
    const createdCar = await this.createCarUsecase.execute(req.body)
    res.json(createdCar)
  }
}

export default function mountToRoutes() {
  const router = Router()
  const carController = Container.get(CarController)
  router.get("/", carController.get);
  router.post("/", carController.post)
  return router
}
