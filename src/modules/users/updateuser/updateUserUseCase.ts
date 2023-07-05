import { AppResponse } from "@helpers/responseParser";
import { inject, injectable } from "tsyringe";
import { IUsersRepositories } from "../iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { AppError } from "@helpers/errorsHandler";
import { IRequestUpdateUser } from "../dto/users";
import { telephoneFormat } from "@utils/formatData";

interface IRequest extends IRequestUpdateUser {
  id: string;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é invalido",
      });
    }

    const listUserById = await this.userRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        message: "Usuario não encontrado!",
      });
    }

    await this.userRepository.update({
      id,
      name,
      telephone: telephoneFormat(telephone),
      birthDate,
    });

    return new AppResponse({
      message: "Usuario atualizado com sucesso!",
    });
  }
}

export { UpdateUserUseCase };
