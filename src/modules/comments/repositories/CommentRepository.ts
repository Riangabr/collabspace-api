import { prisma } from "@libs/prismaClient";
import { ICreateComment, Icomment } from "../dtos/comments";
import { ICommentsRepositories } from "../iRepositories/ICommentsRepositories";

class CommentRepository implements ICommentsRepositories {
  create({ id, postId, userId, content }: ICreateComment): Promise<Icomment> {
    return prisma.comments.create({
      data: {
        id,
        post_id: postId,
        user_id: userId,
        content,
      },
    });
  }
}

export { CommentRepository };
