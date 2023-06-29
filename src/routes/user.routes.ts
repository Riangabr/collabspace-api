import { CreateUserController } from "@/modules/users/useCases/createUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", new CreateUserController().handle);

export { userRoutes };
