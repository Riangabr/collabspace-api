import { GetAddressController } from "@modules/viacep/useCases/getAddress/getAddressController";
import { Router } from "express";

const viacepRoutes = Router();

viacepRoutes.get("/:cep", new GetAddressController().handle);

export { viacepRoutes };
