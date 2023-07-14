import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreateComment } from "@modules/comments/dtos/comments";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRespositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestCreateComment {
  postId: string;
  usrId: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ postId, usrId, content }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "ID é invalido",
      });
    }

    const listPostId = await this.postRepository.listById(postId);

    if (!listPostId) {
      throw new AppError({
        message: "Post não encontrado",
      });
    }

    const createCommet = await this.commentRepository.create({
      id: this.uuidProvider.createUUID(),
      postId,
      userId: usrId,
      content,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Comentário criado com sucesso!",
      data: {
        id: createCommet.id,
        postId: createCommet.post_id,
        userId: createCommet.user_id,
        content: createCommet.content,
      },
    });
  }
}

export { CreateCommentUseCase };
