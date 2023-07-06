import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sesssionRoutes } from "./sesssion.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sesssionRoutes);

export { router };
