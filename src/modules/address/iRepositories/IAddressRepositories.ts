import { IAddress, ICreateAddress, IUpdateAddress } from "../dtos/address";

interface IAddressRepositories {
  create(address: ICreateAddress): Promise<IAddress>;
  listById(id: string): Promise<IAddress | null>;
  update(data: IUpdateAddress): Promise<void>;
}

export { IAddressRepositories };
