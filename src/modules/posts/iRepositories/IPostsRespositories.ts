import { ICreatePost, IPost } from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
}

export { IPostsRepositories };
