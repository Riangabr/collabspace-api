import { Request, Response } from "express";
import { container } from "tsyringe";
import { AcceptRequestUseCase } from "./acceptRequestUseCase";

class AcceptRequestController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const acceptRequestUseCase = container.resolve(AcceptRequestUseCase);

    const result = await acceptRequestUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { AcceptRequestController };
