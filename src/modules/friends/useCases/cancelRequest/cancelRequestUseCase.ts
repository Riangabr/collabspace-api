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
class CancelRequestUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido!",
      });
    }

    const listFriendByID = await this.friendRepository.listById(id);

    if (!listFriendByID) {
      throw new AppError({
        message: "Solicitação não encontrada!",
      });
    }

    if (usrId !== listFriendByID.user_id_1) {
      throw new AppError({
        message: "Operação ão permitida!",
      });
    }

    if (
      listFriendByID.action_id_2 === EnumFriendActions.accepted ||
      listFriendByID.action_id_2 === EnumFriendActions.refused
    ) {
      throw new AppError({
        message: "Essa solicitação já foi aceita ou recusada!",
      });
    }

    await this.friendRepository.updateActionStatus({
      id,
      actionId1: EnumFriendActions.canceled,
      actionId2: null,
    });

    return new AppResponse({
      message: "Solicitação cancelada com sucesso!",
    });
  }
}

export { CancelRequestUseCase };
