import { IRequestCreateUser } from "../dto/users";

class CreateUserUseCase {
  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser) {
    return {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    };
  }
}

export { CreateUserUseCase };
