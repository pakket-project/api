import { UserModel, UserCreateInput } from '@models/user';
import { PrismaService } from '@modules/prisma';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { hash, verify } from 'argon2';

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: UserCreateInput): Promise<UserModel> {
    data.password = await hash(data.password);
    return await this.prisma.user.create({ data: { ...data } });
  }

  @Query(() => [UserModel])
  async user(): Promise<UserModel[]> {
    return await this.prisma.user.findMany();
  }
}
