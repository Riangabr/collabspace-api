import { inject, injectable } from "tsyringe";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";
import { IRequestUpdateUserCover } from "@modules/users/dtos/users";

interface IRequest extends IRequestUpdateUserCover {
  usrId: string;
}

@injectable()
class UpdateCoverUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories
  ) {}

  async execute({ usrId, coverUrl }: IRequest): Promise<AppResponse> {
    if (
      !coverUrl.match(
        /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/gi
      )
    ) {
      throw new AppError({
        message: "URL inválida!",
      });
    }

    await this.userRepository.updateCover({
      id: usrId,
      coverUrl,
    });

    return new AppResponse({
      message: "Avatar atualizado com sucesso!",
    });
  }
}

export { UpdateCoverUseCase };
