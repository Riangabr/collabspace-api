// inversão de dependencia
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRespositories";
import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";
import { PostRepository } from "@modules/posts/repositories/PostRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostRepository
);
