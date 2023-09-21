import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllFriendsByUserUseCase } from "./listAllFriendsByUserUseCase";

class ListAllFriendsByUserController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;

    const listAllFriendsByUserUseCase = container.resolve(
      ListAllFriendsByUserUseCase
    );

    const result = await listAllFriendsByUserUseCase.execute({ usrId });

    return response.status(result.statusCode).json(result);
  }
}

export { ListAllFriendsByUserController };
