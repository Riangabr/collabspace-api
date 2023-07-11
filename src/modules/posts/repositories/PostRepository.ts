import { prisma } from "@libs/prismaClient";
import { ICreatePost, IListAllPosts, IPost } from "../dtos/posts";
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

  listAll(page: number, limit: number): Promise<IListAllPosts[]> {
    return prisma.posts.findMany({
      skip: page * limit,
      take: limit,
      select: {
        id: true,
        user_id: false,
        content: true,
        tags: true,
        visibility: true,
        published_at: true,
        users: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
      },
    });
  }
}

export { PostRepository };
