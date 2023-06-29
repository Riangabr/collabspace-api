import { ICreateUser, IUser } from "../dto/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUser>;
}

export { IUsersRepositories };
