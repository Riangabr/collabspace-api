import { CreateCommentController } from "@modules/comments/useCases/createComment/createCommentController";
import { UpdateCommentController } from "@modules/comments/useCases/updateComment/updateCommentController";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const commentRoutes = Router();

commentRoutes.use(authentication);

commentRoutes.post("/:id", new CreateCommentController().handle);
commentRoutes.put("/:id", new UpdateCommentController().handle);

export { commentRoutes };
