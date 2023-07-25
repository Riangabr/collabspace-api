import { Request, Response } from "express";
import { RecuseRequestUseCase } from "./recuseRequestUseCase";
import { container } from "tsyringe";

class RecuseRequestController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const recuseRequestUseCase = container.resolve(RecuseRequestUseCase);
    const result = await recuseRequestUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { RecuseRequestController };
