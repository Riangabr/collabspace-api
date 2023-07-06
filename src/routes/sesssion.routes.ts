import { CreateUserSessionController } from "@modules/users/useCases/createUserSession/createUserSessionController";
import { Router } from "express";

const sesssionRoutes = Router();

sesssionRoutes.post("/", new CreateUserSessionController().handle);

export { sesssionRoutes };
