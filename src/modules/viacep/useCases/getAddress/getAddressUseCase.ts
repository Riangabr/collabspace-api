import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import axios from "axios";
import { injectable } from "tsyringe";

interface IRequest {
  cep: string;
}

@injectable()
class GetAddressUseCase {
  async execute({ cep }: IRequest): Promise<AppResponse> {
    const viacepUrl = "https://viacep.com.br/ws/{cep}/json/";

    try {
      const response = await axios.get(viacepUrl.replace("{cep}", cep));

      if (response.data.erro) {
        return new AppResponse({
          message: "O endereço é inválido",
        });
      }

      return new AppResponse({
        data: { address: response.data },
      });
    } catch (error) {
      throw new AppError({
        statusCode: 400,
        message: "Erro ao buscar CEP",
      });
    }
  }
}

export { GetAddressUseCase };
