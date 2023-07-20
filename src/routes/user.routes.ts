import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/updateUserController";
import { InactivateUserController } from "@modules/users/useCases/inactivateUser/inactivateUserController";

import { authentication } from "src/middlewares/authentication";
import { UpadateAvatarController } from "@modules/users/useCases/updateAvatar/updateAvatarController";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

userRoutes.use(authentication);

userRoutes.put("/", new UpdateUserController().handle);
userRoutes.patch("/updateAvatar", new UpadateAvatarController().handle);
userRoutes.delete("/", new InactivateUserController().handle);

export { userRoutes };
