import { CurrentUser } from '@decorators';
import { RequiredID } from '@models/args';
import { UserModel, UserCreateInput } from '@models/user';
import { PrismaService } from '@modules/prisma';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {}

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: UserCreateInput): Promise<UserModel> {
    return await this.userService.createUser(data);
  }

  @Query(() => UserModel)
  async user(@Args() { id }: RequiredID): Promise<UserModel> {
    return await this.userService.getUser({ id });
  }

  @Query(() => UserModel)
  me(@CurrentUser() user: User): UserModel {
    return user;
  }
}
