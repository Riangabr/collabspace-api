import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepositories";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { EnumFriendActions } from "src/enums/friendActions";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  targetId: string;
}

@injectable()
class CreateFriendUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, targetId }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(targetId)) {
      throw new AppError({
        message: "ID é invalido!",
      });
    }

    if (usrId === targetId) {
      throw new AppError({
        message: "Não é  possivel enviar uma solcitação para você mesmo!",
      });
    }

    const listUserById = await this.userRepository.listById(targetId);

    if (!listUserById) {
      throw new AppError({
        message: "Usuário alvo não encontrado!",
      });
    }

    const listFriendshipAlreadyExits =
      await this.friendRepository.listAlreadyExits(usrId, targetId);

    if (listFriendshipAlreadyExits) {
      if (
        listFriendshipAlreadyExits.action_id_1 ===
          EnumFriendActions.requested &&
        !listFriendshipAlreadyExits.action_id_2
      ) {
        throw new AppError({
          message: "Solicitação já enviada! ",
        });
      }

      if (
        listFriendshipAlreadyExits.action_id_1 === EnumFriendActions.canceled ||
        listFriendshipAlreadyExits.action_id_2 === EnumFriendActions.refused
      ) {
        await this.friendRepository.updateActionStatus({
          id: listFriendshipAlreadyExits.id,
          actionId1: EnumFriendActions.requested,
          actionId2: null,
        });

        return new AppResponse({
          message: "Solicitação enviada com sucesso!",
        });
      }

      if (
        listFriendshipAlreadyExits.action_id_2 === EnumFriendActions.accepted
      ) {
        throw new AppError({
          message: "Solicitação já foi aceita!",
        });
      }
    }

    const createFriend = await this.friendRepository.create({
      id: this.uuidProvider.createUUID(),
      userId1: usrId,
      userId2: targetId,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Solicitação enviada com sucesso!",
      data: {
        id: createFriend.id,
        userId1: createFriend.user_id_1,
        userId2: createFriend.user_id_2,
        actionId1: createFriend.action_id_1,
        actionId2: createFriend.action_id_2,
        createdAt: createFriend.created_at,
      },
    });
  }
}

export { CreateFriendUseCase };