// inversão de dependencia
import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);
