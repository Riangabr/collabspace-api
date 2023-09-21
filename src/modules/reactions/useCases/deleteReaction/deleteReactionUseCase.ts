import { inject, injectable } from "tsyringe";
import { IReactionsRepositories } from "@modules/reactions/iRepositories/IReactionsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeleteReactionUseCase {
  constructor(
    @inject("ReactionRepository")
    private reactionRepository: IReactionsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é invalido!",
      });
    }

    const listReactionById = await this.reactionRepository.listById(id);

    if (!listReactionById) {
      throw new AppError({
        message: "Reação não encontrada!",
      });
    }

    if (usrId !== listReactionById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operaçao não permitida!",
      });
    }

    await this.reactionRepository.delete(id);

    return new AppResponse({
      message: "Reação removida com sucesso!",
    });
  }
}

export { DeleteReactionUseCase };
