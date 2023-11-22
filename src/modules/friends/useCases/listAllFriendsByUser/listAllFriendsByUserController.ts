import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllFriendsByUserUseCase } from "./listAllFriendsByUserUseCase";

class ListAllFriendsByUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    const listAllFriendsByUserUseCase = container.resolve(
      ListAllFriendsByUserUseCase
    );

    const result = await listAllFriendsByUserUseCase.execute({
      id,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { ListAllFriendsByUserController };
