import { ICreateUser, IUser, IUpdateUser } from "@modules/users/dto/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUser>;
  listByEmail(email: string): Promise<IUser | null>;
  listById(id: string): Promise<IUser | null>;
  update(data: IUpdateUser): Promise<void>;
}

export { IUsersRepositories };
