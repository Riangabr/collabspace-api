import { ICreateComment, Icomment } from "../dtos/comments";

interface ICommentsRepositories {
  create(comment: ICreateComment): Promise<Icomment>;
}

export { ICommentsRepositories };
