import {
  ICreatePost,
  IListAllPostsByUser,
  IListAllPosts,
  IPost,
  IUpdatePost,
} from "../dtos/posts";

interface IPostsRepositories {
  create(post: ICreatePost): Promise<IPost>;
  listById(id: string): Promise<IPost | null>;
  listAll(page: number, limit: number): Promise<IListAllPosts[]>;
  listAllByUser(
    id: string,
    page: number,
    limit: number
  ): Promise<IListAllPostsByUser[]>;
  count(): Promise<number>;
  countByUser(id: string): Promise<number>;
  update(data: IUpdatePost): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IPostsRepositories };
