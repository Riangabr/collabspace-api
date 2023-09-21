import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelRequestUseCase } from "./cancelRequestUseCase";

class CancelRequestController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const cancelRequestUseCase = container.resolve(CancelRequestUseCase);

    const result = await cancelRequestUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CancelRequestController };
