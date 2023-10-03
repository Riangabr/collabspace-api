import { Router } from "express";

import { CreateFriendController } from "@modules/friends/useCases/createFriend/createFriendController";

import { authentication } from "src/middlewares/authentication";

import { CancelRequestController } from "@modules/friends/useCases/cancelRequest/cancelRequestController";
import { AcceptRequestController } from "@modules/friends/useCases/acceptRequest/acceptRequestController";
import { RecuseRequestController } from "@modules/friends/useCases/recuseRequest/recuseRequestController";
import { DeleteFriendController } from "@modules/friends/useCases/deleteFriend/deleteFriendController";
import { ListAllFriendsByUserController } from "@modules/friends/useCases/listAllFriendsByUser/listAllFriendsByUserController";
import { ListAllRequestsByUserController } from "@modules/friends/useCases/listAllRequestByUser/listAllRequestsByUserController";

const friendRoutes = Router();

friendRoutes.use(authentication);

friendRoutes.get(
  "/listAllFriends/:id",
  new ListAllFriendsByUserController().handle
);

friendRoutes.get(
  "/listAllRequests/:id",
  new ListAllRequestsByUserController().handle
);

friendRoutes.post("/:targetId", new CreateFriendController().handle);
friendRoutes.patch("/cancelRequest/:id", new CancelRequestController().handle);
friendRoutes.patch("/acceptRequest/:id", new AcceptRequestController().handle);
friendRoutes.patch("/recuseRequest/:id", new RecuseRequestController().handle);
friendRoutes.delete("/deleteFriend/:id", new DeleteFriendController().handle);

export { friendRoutes };
