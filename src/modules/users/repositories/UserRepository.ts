import { prisma } from "@libs/prismaClient";

import {
  ICreateUser,
  IUpdateUser,
  IUpdateUserAvatar,
  IUpdateUserCover,
  IUpdateUserPassword,
  IUser,
} from "@modules/users/dtos/users";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";

class UserRepository implements IUsersRepositories {
  create({
    id,
    name,
    email,
    telephone,
    birthDate,
    password,
  }: ICreateUser): Promise<IUser> {
    return prisma.users.create({
      data: {
        id,
        name,
        email,
        telephone,
        birth_date: birthDate,
        password,
      },
    });
  }

  listByEmail(email: string): Promise<IUser | null> {
    return prisma.users.findFirst({
      where: { email: { equals: email } },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        password: true,
        birth_date: true,
        avatar_url: true,
        cover_url: true,
        bio: true,
        created_at: true,
        active: true,
        address: {
          select: {
            id: true,
            user_id: true,
            cep: true,
            country: true,
            province: true,
            city: true,
            street: true,
          },
        },
      },
    });
  }

  listById(id: string): Promise<IUser | null> {
    return prisma.users.findFirst({
      where: { id },
    });
  }

  async update({
    id,
    name,
    telephone,
    birthDate,
    bio,
  }: IUpdateUser): Promise<void> {
    console.log({
      id,
      name,
      telephone,
      birthDate,
      bio,
    });

    await prisma.users.update({
      where: { id },
      data: {
        name,
        telephone,
        birth_date: birthDate,
        bio,
      },
    });
  }

  async updateAvatar({ id, avatarUrl }: IUpdateUserAvatar): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        avatar_url: avatarUrl,
      },
    });
  }

  async updateCover({ id, coverUrl }: IUpdateUserCover): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        cover_url: coverUrl,
      },
    });
  }

  async updatePassword({ id, password }: IUpdateUserPassword): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: {
        password,
      },
    });
  }

  async inactivate(id: string, status: boolean): Promise<void> {
    await prisma.users.update({
      where: { id },
      data: { active: status },
    });
  }
}

export { UserRepository };
