import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sesssionRoutes } from "./sesssion.routes";
import { postRoutes } from "./post.routes";
import { commentRoutes } from "./comment.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sesssionRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export { router };
