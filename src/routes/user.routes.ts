import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/updateUserController";

import { authentication } from "src/middlewares/authentication";
import { InactivateUserController } from "@modules/users/useCases/inactivateUser/InactivateUserController";

const userRoutes = Router();

userRoutes.use(authentication);

userRoutes.post("/", new CreateUserController().handle);

userRoutes.put("/", new UpdateUserController().handle);

userRoutes.delete("/", new InactivateUserController().handle);

export { userRoutes };
