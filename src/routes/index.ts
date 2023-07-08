import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sesssionRoutes } from "./sesssion.routes";
import { postRoutes } from "./post.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sesssionRoutes);
router.use("/posts", postRoutes);

export { router };
