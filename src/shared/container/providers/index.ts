import { container } from "tsyringe";

import { IUuidProvider } from "./uuidProvider/IUuidProvider";
import { UuidProvider } from "./uuidProvider/implamentation/UuidProvider";

import { IBcryptProvider } from "./bcryptProvider/IBcryptProvider";
import { BcryptProvider } from "./bcryptProvider/implamentation/BcryptProvider";

container.registerSingleton<IUuidProvider>("UuidProvider", UuidProvider);

container.registerSingleton<IBcryptProvider>("BcryptProvider", BcryptProvider);
