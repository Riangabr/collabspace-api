import { UpdateUserController } from "@modules/users/updateuser/updateUserController";
import { CreateUserController } from "@modules/users/useCases/createUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.put("/:id", new UpdateUserController().handle);

export { userRoutes };
