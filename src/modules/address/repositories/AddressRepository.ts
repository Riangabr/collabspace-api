import { prisma } from "@libs/prismaClient";
import { IAddress, ICreateAddress, IUpdateAddress } from "../dtos/address";
import { IAddressRepositories } from "../iRepositories/IAddressRepositories";

class AddressRepository implements IAddressRepositories {
  create({
    id,
    userId,
    country,
    cep,
    province,
    city,
    street,
  }: ICreateAddress): Promise<IAddress> {
    return prisma.address.create({
      data: {
        id,
        user_id: userId,
        country,
        cep,
        province,
        city,
        street,
      },
      select: {
        id: true,
        user_id: true,
        country: true,
        cep: true,
        province: true,
        city: true,
        street: true,
      },
    });
  }

  listById(id: string): Promise<IAddress | null> {
    return prisma.address.findFirst({
      where: { id },
      select: {
        id: true,
        user_id: true,
        country: true,
        cep: true,
        province: true,
        city: true,
        street: true,
      },
    });
  }

  async update({
    id,
    country,
    cep,
    province,
    city,
    street,
  }: IUpdateAddress): Promise<void> {
    await prisma.address.update({
      where: { id },
      data: {
        country,
        cep,
        province,
        city,
        street,
      },
    });
  }
}

export { AddressRepository };
