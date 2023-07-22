import { CancelRequestController } from "@modules/friends/useCases/cancelRequest/cancelRequestController";
import { CreateFriendController } from "@modules/friends/useCases/createFriend/createFriendController";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const friendRoutes = Router();

friendRoutes.use(authentication);

friendRoutes.post("/:targetId", new CreateFriendController().handle);
friendRoutes.patch("/cancelRequest/:id", new CancelRequestController().handle);

export { friendRoutes };
