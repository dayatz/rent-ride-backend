import type { Request, Response, Router } from 'express'
import { LoginUsecase } from "core/auth/usecases/login";
import Container, { Inject, Service } from "typedi";
import { LoginDTO, LoginResultDTO } from 'core/auth/dto/login-dto';

@Service()
export class AuthController {
  constructor(
    @Inject(() => LoginUsecase) private loginUsecase: LoginUsecase
  ) {
    this.login = this.login.bind(this)
  }

  async login(req: Request<{}, {}, LoginDTO>, res: Response) {
    const { email, password } = req.body
    try {
      const result = await this.loginUsecase.execute({email, password})
      res.json(result)
    } catch(e) {
      if (e instanceof Error) res.status(401).json({
        message: e.message
      })
    }
  }
}

export default function mountToRoutes(router: Router) {
  const userController = Container.get(AuthController)
  router.post("/login", userController.login)

  return router;
}