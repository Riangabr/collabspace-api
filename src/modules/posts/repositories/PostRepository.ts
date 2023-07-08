import { prisma } from "@libs/prismaClient";
import { ICreatePost, IPost } from "../dtos/posts";
import { IPostsRepositories } from "../iRepositories/IPostsRespositories";

class PostRepository implements IPostsRepositories {
  create({
    id,
    userId,
    content,
    tags,
    visibility,
  }: ICreatePost): Promise<IPost> {
    return prisma.posts.create({
      data: {
        id,
        user_id: userId,
        content,
        tags,
        visibility,
      },
    });
  }
}

export { PostRepository };
