import { IRequestUpdateAddress } from "@modules/address/dtos/address";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAddressUseCase } from "./updateAddressUseCase";

class UpdateAddressController {
  async handle(req: Request, res: Response) {
    const { usrId } = req;

    const { id } = req.params as { id: string };

    const { country, cep, province, city, street } =
      req.body as IRequestUpdateAddress;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    const result = await updateAddressUseCase.execute({
      usrId,
      id,
      country,
      cep,
      province,
      city,
      street,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { UpdateAddressController };
