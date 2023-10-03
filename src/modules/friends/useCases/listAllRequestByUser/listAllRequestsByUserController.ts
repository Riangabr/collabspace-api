import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllRequestsByUserUseCase } from "./listAllRequestsByUserUseCase";

class ListAllRequestsByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as { id: string };

    const listAllRequestsByUserUseCase = container.resolve(
      ListAllRequestsByUserUseCase
    );

    const result = await listAllRequestsByUserUseCase.execute({ id });

    return response.status(result.statusCode).json(result);
  }
}

export { ListAllRequestsByUserController };
