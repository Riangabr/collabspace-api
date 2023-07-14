import { prisma } from "@libs/prismaClient";
import { ICreateComment, IUpdateComment, Icomment } from "../dtos/comments";
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

  listById(id: string): Promise<Icomment | null> {
    return prisma.comments.findFirst({
      where: { id },
    });
  }

  async update({ id, content }: IUpdateComment): Promise<void> {
    await prisma.comments.update({
      where: { id },
      data: {
        content,
      },
    });
  }
}

export { CommentRepository };
