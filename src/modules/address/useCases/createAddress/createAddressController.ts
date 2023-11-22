import { IRequestCreateAddress } from "@modules/address/dtos/address";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAddressUseCase } from "../createAddress/createAddressUseCase";

class CreateAddressController {
  async handle(req: Request, res: Response) {
    const userId = req.usrId;
    const { country, cep, province, city, street } =
      req.body as IRequestCreateAddress;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    const result = await createAddressUseCase.execute({
      userId,
      country,
      cep,
      province,
      city,
      street,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { CreateAddressController };
