import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/updateUserController";
import { InactivateUserController } from "@modules/users/useCases/inactivateUser/inactivateUserController";

import { authentication } from "src/middlewares/authentication";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/updateAvatarController";
import { UpdateCoverController } from "@modules/users/useCases/updateCover/updateCoverController";
import { ListUserByIdController } from "@modules/users/useCases/listUserById/listUserByIdController";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

userRoutes.use(authentication);

userRoutes.get("/:id", new ListUserByIdController().handle);
userRoutes.put("/", new UpdateUserController().handle);
userRoutes.patch("/updateAvatar", new UpdateAvatarController().handle);
userRoutes.patch("/updateCover", new UpdateCoverController().handle);
userRoutes.delete("/", new InactivateUserController().handle);

export { userRoutes };
