import { Request, Response } from "express";
import { container } from "tsyringe";
import { IRequestUpdateUserAvatar } from "@modules/users/dtos/users";
import { UpdateAvatarUseCase } from "./updateAvatarUseCase";

class UpdateAvatarController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { avatarUrl } = request.body as IRequestUpdateUserAvatar;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    const result = await updateAvatarUseCase.execute({
      usrId,
      avatarUrl,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateAvatarController };
