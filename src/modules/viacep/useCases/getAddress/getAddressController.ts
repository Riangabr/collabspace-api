import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAddressUseCase } from "./getAddressUseCase";

class GetAddressController {
  async handle(req: Request, res: Response) {
    const { cep } = req.params as { cep: string };

    const getAddressUseCase = container.resolve(GetAddressUseCase);

    const result = await getAddressUseCase.execute({
      cep,
    });

    return res.status(result.statusCode).json(result);
  }
}

export { GetAddressController };
