import { Router } from "express";

import { CreatePostController } from "@modules/posts/useCases/createPost/createPostController";

import { authentication } from "src/middlewares/authentication";

const postRoutes = Router();

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);

export { postRoutes };
