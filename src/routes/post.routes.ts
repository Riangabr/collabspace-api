import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController";

import { authentication } from "src/middlewares/authentication";
import { ListAllPostsController } from "@modules/posts/useCases/listAllPosts/listAllPostsController";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/updatePostController";
import { DeletePostController } from "@modules/posts/useCases/deletePost/deletePostController";
import { ListPostByUserController } from "@modules/posts/useCases/listPostByUser/listPostByUserController";

const postRoutes = Router();

postRoutes.use(authentication);

postRoutes.get("/", new ListAllPostsController().handle);
postRoutes.post("/listByUser", new ListPostByUserController().handle);

postRoutes.post("/", new CreatePostController().handle);
postRoutes.put("/:id", new UpdatePostController().handle);
postRoutes.delete("/:id", new DeletePostController().handle);

export { postRoutes };
