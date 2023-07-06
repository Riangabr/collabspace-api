import { IRequestCreateUserSesssion } from "@modules/users/dto/sessions";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserSessionUseCase } from "./createUserSessionUseCase";

class CreateUserSessionController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body as IRequestCreateUserSesssion;

    const createUserSesssionUseCase = container.resolve(
      CreateUserSessionUseCase
    );

    const result = await createUserSesssionUseCase.execute({
      email,
      password,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserSessionController };
