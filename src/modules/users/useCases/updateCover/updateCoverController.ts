import { Request, Response } from "express";
import { container } from "tsyringe";
import { IRequestUpdateUserCover } from "@modules/users/dtos/users";
import { UpdateCoverUseCase } from "./updateCoverUseCase";

class UpdateCoverController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { coverUrl } = request.body as IRequestUpdateUserCover;

    const updateCoverUseCase = container.resolve(UpdateCoverUseCase);

    const result = await updateCoverUseCase.execute({
      usrId,
      coverUrl,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateCoverController };
