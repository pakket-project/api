import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { PrismaService } from '@modules/prisma';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({ where });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] }
    });

    if (user) throw new HttpException('user_already_exists', HttpStatus.CONFLICT);

    return await this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, { hashLength: 32 })
      }
    });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await verify(user.password, password);
  }
}
