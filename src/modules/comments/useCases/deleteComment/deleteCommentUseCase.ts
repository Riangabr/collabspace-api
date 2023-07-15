import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { ICommentsRepositories } from "@modules/comments/iRepositories/ICommentsRepositories";
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRespositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  postId: string;
  id: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject("CommentRepository")
    private commentRepository: ICommentsRepositories,
    @inject("PostRepository")
    private postRepository: IPostsRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ usrId, postId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "CommentID é invalido!",
      });
    }
    if (!this.uuidProvider.validateUUID(postId)) {
      throw new AppError({
        message: "PostID é invalido!",
      });
    }
    const listCommentById = await this.commentRepository.listById(id);

    if (!listCommentById) {
      throw new AppError({
        message: "Comentário não encontrado!",
      });
    }

    const listPostById = await this.commentRepository.listById(postId);

    if (!listPostById) {
      throw new AppError({
        message: "Post não encontrado",
      });
    }

    if (usrId !== listCommentById.user_id && usrId !== listPostById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.commentRepository.delete(id);

    return new AppResponse({
      message: "Comentário deletado com sucesso!",
    });
  }
}

export { DeleteCommentUseCase };
