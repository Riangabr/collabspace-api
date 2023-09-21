import { inject, injectable } from "tsyringe";
import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { EnumFriendActions } from "src/enums/friendActions";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeleteFriendUseCase {
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

    const listFriendById = await this.friendRepository.listById(id);

    if (!listFriendById) {
      throw new AppError({
        message: "Amizade não encontrada!",
      });
    }

    if (
      usrId !== listFriendById.user_id_1 &&
      usrId !== listFriendById.user_id_2
    ) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    if (
      listFriendById.action_id_1 !== EnumFriendActions.requested ||
      listFriendById.action_id_2 !== EnumFriendActions.accepted
    ) {
      throw new AppError({
        message: "Amizade não aceita, cancelada ou recusada!",
      });
    }

    await this.friendRepository.delete(id);

    return new AppResponse({
      message: "Amizade desfeita com sucesso!",
    });
  }
}

export { DeleteFriendUseCase };
