import { Router } from 'express';

import { CreateUserDTO } from "core/user/dto/user-dto";
import GetAllUserUsecase from "core/user/usecases/get-all-users";
import RegisterUserUsecase from "core/user/usecases/register-user";
import type { Request, Response } from "express";
import Container, { Inject, Service } from "typedi";

@Service()
export class UserController {
  constructor(
    @Inject(() => RegisterUserUsecase) private registerUsecase: RegisterUserUsecase,
    @Inject(() => GetAllUserUsecase) private getAllUsersUsecase: GetAllUserUsecase
  ) {
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
  }

  async get(req: Request, res: Response) {
    res.json(await this.getAllUsersUsecase.execute());
  }

  async post(req: Request<{}, {}, CreateUserDTO>, res: Response) {
    const {
      name, email, password
    } = req.body
    const result = await this.registerUsecase.execute({
      name, email, password
    })
    res.json(result)
  }
};

export default function mountToRoutes() {
  const router = Router()
  const userController = Container.get(UserController)
  router.get("/", userController.get);
  router.post("/", userController.post)
  return router;
}
