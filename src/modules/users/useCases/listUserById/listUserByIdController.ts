import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByIdUseCase } from "./listUserByIdUseCase";

class ListUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as { id: string };

    const listUserIdByUseCase = container.resolve(ListUserByIdUseCase);

    const result = await listUserIdByUseCase.execute({ id });

    return response.status(result.statusCode).json(result);
  }
}

export { ListUserByIdController };
