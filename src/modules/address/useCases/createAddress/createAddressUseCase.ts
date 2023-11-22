import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestCreateAddress } from "@modules/address/dtos/address";
import { IAddressRepositories } from "@modules/address/iRepositories/IAddressRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestCreateAddress {
  userId: string;
}

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    userId,
    country,
    cep,
    province,
    city,
    street,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(userId)) {
      throw new AppError({
        message: "User ID é inválido!",
      });
    }

    const createAddress = await this.addressRepository.create({
      id: this.uuidProvider.createUUID(),
      userId,
      country,
      cep,
      province,
      city,
      street,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Endereço criado com sucesso!",
      data: {
        id: createAddress.id,
        userId: createAddress.user_id,
        country: createAddress.country,
        cep: createAddress.cep,
        province: createAddress.province,
        city: createAddress.city,
        street: createAddress.street,
      },
    });
  }
}

export { CreateAddressUseCase };
