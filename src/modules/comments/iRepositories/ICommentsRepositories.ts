import { ICreateComment, IUpdateComment, Icomment } from "../dtos/comments";

interface ICommentsRepositories {
  create(comment: ICreateComment): Promise<Icomment>;
  listById(id: string): Promise<Icomment | null>;
  update(data: IUpdateComment): Promise<void>;
}

export { ICommentsRepositories };
