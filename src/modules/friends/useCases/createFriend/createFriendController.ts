import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFriendUseCase } from "./createFriendUseCase";

class CreateFriendController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { targetId } = request.params as { targetId: string };

    const createFriendUseCase = container.resolve(CreateFriendUseCase);

    const result = await createFriendUseCase.execute({
      usrId,
      targetId,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateFriendController };
