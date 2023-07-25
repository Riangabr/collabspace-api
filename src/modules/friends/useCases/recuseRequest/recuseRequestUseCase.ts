import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { EnumFriendActions } from "src/enums/friendActions";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class RecuseRequestUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }
    const listFriendById = await this.friendRepository.listById(id);

    if (!listFriendById) {
      throw new AppError({
        message: "Solicitação não encontrada!",
      });
    }

    if (usrId !== listFriendById.user_id_2) {
      throw new AppError({
        message: "Operação não permitida!",
      });
    }
    if (listFriendById.action_id_2 === EnumFriendActions.refused) {
      throw new AppError({
        message: "Solicitação foi cancelada ou recusada!",
      });
    }
    if (listFriendById.action_id_1 !== EnumFriendActions.requested) {
      throw new AppError({
        message: "Solicitação foi cancelada ou recusada!",
      });
    }

    return new AppResponse({
      message: "Solicitação recusada!",
    });
  }
}

export { RecuseRequestUseCase };
