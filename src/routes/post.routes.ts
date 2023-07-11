import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController";

import { authentication } from "src/middlewares/authentication";
import { ListAllPostsController } from "@modules/posts/listAllPosts/listAllPostsController";

const postRoutes = Router();

postRoutes.get("/", new ListAllPostsController().handle);

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);

export { postRoutes };
