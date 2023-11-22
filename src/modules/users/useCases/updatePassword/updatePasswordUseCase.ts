import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateUserPassword } from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateUserPassword {
  usrId: string;
}

@injectable()
class UpdatePasswordUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories,
    @inject("BcryptProvider")
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({
    usrId,
    currentPassword,
    newPassword,
  }: IRequest): Promise<AppResponse> {
    if (newPassword)
      if (
        !newPassword.match(
          /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        )
      ) {
        throw new AppError({
          message: "Senha Fraca!",
        });
      }

    const listUserById = await this.userRepository.listById(usrId);

    if (!listUserById) {
      throw new AppError({
        message: "Usuário Inválido!",
      });
    }

    const passwordMatch = await this.bcryptProvider.checkPassword(
      currentPassword,
      listUserById.password
    );

    if (!passwordMatch) {
      throw new AppError({
        message: "Senha Atual incorreta!",
      });
    }

    const isSamePassword = await this.bcryptProvider.checkPassword(
      newPassword,
      listUserById.password
    );

    if (isSamePassword) {
      throw new AppError({
        message: "As senhas são iguais!",
      });
    }

    const passwordHash = await this.bcryptProvider.encryptPassword(newPassword);

    await this.userRepository.updatePassword({
      id: usrId,
      password: passwordHash.hash,
    });

    return new AppResponse({
      message: "Senha Atualizada com sucesso!",
    });
  }
}

export { UpdatePasswordUseCase };
