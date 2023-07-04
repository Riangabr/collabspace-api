import { CreateUserController } from "@modules/users/useCases/createUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

export { userRoutes };
