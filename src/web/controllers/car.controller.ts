import { Router, type Request, type Response } from "express";
import { CreateCarUsecase } from "core/car/usecases/create-car";
import Container, { Inject, Service } from "typedi";
import { GetAllCarsUsecase } from "core/car/usecases/get-all-cars";
import { CreateCarDTO } from "core/car/dto/car.dto";
import { FormattedError } from "core/types";

function isCustomError(error: unknown): error is FormattedError {
  return typeof error === 'object' && error !== null && 'type' in error;
}

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
    try {
      const createdCar = await this.createCarUsecase.execute(req.body)
      return res.json(createdCar)
    } catch(e) {
      console.log('errr', e)
      if (isCustomError(e)) {
        return res.status(400).json(e)
      }
      return res.status(400).json({"message": "invalid request"})
    }
  }
}

export default function mountToRoutes() {
  const router = Router()
  const carController = Container.get(CarController)
  router.get("/", carController.get);
  router.post("/", carController.post)
  return router
}
