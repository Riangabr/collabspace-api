import { ICreateFriend, IFriend, IUpdateActionStatus } from "../dtos/friends";

interface IFriendsRepositories {
  create(data: ICreateFriend): Promise<IFriend>;
  listById(id: string): Promise<IFriend | null>;
  listAlreadyExits(userId1: string, userId2: string): Promise<IFriend | null>;
  updateActionStatus(data: IUpdateActionStatus): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IFriendsRepositories };
