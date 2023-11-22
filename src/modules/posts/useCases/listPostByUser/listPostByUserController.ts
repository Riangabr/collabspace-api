import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPostByUserUseCase } from "./listPostByUserUseCase";

class ListPostByUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.body as { id: string };
    const { page, limit } = req.query as { page: string; limit: string };

    const listPostByUserUseCase = container.resolve(ListPostByUserUseCase);

    const result = await listPostByUserUseCase.execute({
      id,
      page,
      limit,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { ListPostByUserController };
