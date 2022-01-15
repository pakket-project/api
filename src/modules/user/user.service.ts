import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from '@modules/prisma';
import { Prisma, User } from '@prisma/client';
import { AuthService } from '@modules/auth';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly authService: AuthService) {}

  async get(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });

    if (!user) throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] }
    });

    if (user) throw new HttpException('user_already_exists', HttpStatus.CONFLICT);

    return await this.prisma.user.create({
      data: {
        ...data,
        password: await this.authService.hash(data.password)
      }
    });
  }

  async delete(id: string): Promise<User> {
    const user = await this.get({ id });

    return await this.prisma.user.delete({ where: { id: user.id } });
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Omit<Prisma.UserUpdateInput, 'password'>
  ): Promise<User> {
    return await this.prisma.user.update({ where, data });
  }

  async changePassword(
    where: Prisma.UserWhereUniqueInput,
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    const { id, password } = await this.get(where);

    // check old password
    if (!(await this.authService.verifyHash(oldPassword, password))) {
      // old password does not match
      throw new HttpException('old_password_does_not_match', HttpStatus.UNAUTHORIZED);
    }

    // update password
    return await this.prisma.user.update({
      where: { id },
      data: { password: await this.authService.hash(newPassword) }
    });
  }
}
