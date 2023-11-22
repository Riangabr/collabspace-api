import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateAddress } from "@modules/address/dtos/address";
import { IAddressRepositories } from "@modules/address/iRepositories/IAddressRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateAddress {
  usrId: string;
  id: string;
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    usrId,
    id,
    country,
    cep,
    province,
    city,
    street,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido!",
      });
    }

    const listById = await this.addressRepository.listById(id);

    if (!listById) {
      throw new AppError({
        message: "Endereço não encontrado!",
      });
    }

    if (usrId !== listById.user_id) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    await this.addressRepository.update({
      id,
      country,
      cep,
      province,
      city,
      street,
    });

    return new AppResponse({
      message: "Endereço atualizado com sucesso!",
    });
  }
}

export { UpdateAddressUseCase };
