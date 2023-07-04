import "./providers";
import { container } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);
