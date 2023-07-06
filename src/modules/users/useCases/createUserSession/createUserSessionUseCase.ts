import { AppError } from "@helpers/errorsHandler";
import { sign } from "jsonwebtoken";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreateUserSesssion } from "@modules/users/dto/sessions";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserSessionUseCase {
  constructor(
    @inject("UserRepository")
    private useRepository: IUsersRepositories,
    @inject("BcryptProvider")
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({
    email,
    password,
  }: IRequestCreateUserSesssion): Promise<AppResponse> {
    const listUserByEmail = await this.useRepository.listByEmail(email);

    if (!listUserByEmail) {
      throw new AppError({
        message: "Email ou senha incorretos!",
      });
    }
    if (!listUserByEmail.active) {
      throw new AppError({
        message: "Usuário inativo!",
      });
    }
    const passwordMatch = await this.bcryptProvider.checkPassword(
      password,
      listUserByEmail.password
    );

    if (!passwordMatch) {
      throw new AppError({
        message: "E-mail ou senha incorretos",
      });
    }

    const tokenPayload = {
      id: listUserByEmail.id,
    };

    const token = sign({ tokenPayload }, process.env.JWT_SECRET_TOKEN, {
      subject: listUserByEmail.email,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return new AppResponse({
      message: "Usuario logado com sucesso!",
      data: {
        token,
        user: {
          id: listUserByEmail.id,
          name: listUserByEmail.name,
          email: listUserByEmail.email,
          telephone: listUserByEmail.telephone,
          birthDate: listUserByEmail.birth_date,
          avatarURL: listUserByEmail.avatar_url,
          cretedAt: listUserByEmail.created_at,
        },
      },
    });
  }
}

export { CreateUserSessionUseCase };
