import { CurrentUser } from '@decorators';
import { RequiredID } from '@models/args';
import { PackageModel } from '@models/package';
import { UserModel, UserCreateInput, UserUpdateInput, UserUpdatePasswordInput } from '@models/user';
import { PrismaService } from '@modules/prisma';
import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Resolver(UserModel)
export class UserResolver {
  constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {}

  /**
   * Resolve packages.
   */
  @ResolveField(() => [PackageModel])
  async packages(@Root() user: UserModel): Promise<PackageModel[]> {
    const packages = await this.prisma.user
      .findUnique({
        where: { id: user.id },
        select: { packages: true }
      })
      .packages();

    return packages;
  }

  /**
   * Get user by ID.
   */
  @Query(() => UserModel)
  async user(@Args() { id }: RequiredID): Promise<UserModel> {
    return await this.userService.get({ id });
  }

  /**
   * Query current user.
   */
  @Query(() => UserModel)
  me(@CurrentUser() user: User): UserModel {
    return user;
  }

  /**
   * Create user mutation.
   */
  @Mutation(() => UserModel)
  async createUser(@Args('data') data: UserCreateInput): Promise<UserModel> {
    return await this.userService.createUser(data);
  }

  /**
   * Update user mutation.
   */
  @Mutation(() => UserModel)
  async updateUser(
    @Args() { id }: RequiredID,
    @Args('data') data: UserUpdateInput
  ): Promise<UserModel> {
    return await this.userService.updateUser({ id }, data);
  }

  /**
   * Delete user mutation.
   */
  @Mutation(() => UserModel)
  async deleteUser(@Args() { id }: RequiredID): Promise<UserModel> {
    return await this.userService.delete(id);
  }

  /**
   * Change password mutation.
   */
  @Mutation(() => UserModel)
  async changePassword(
    @CurrentUser() user: User,
    @Args('data') { newPassword, oldPassword }: UserUpdatePasswordInput
  ): Promise<UserModel> {
    return await this.userService.changePassword({ id: user.id }, oldPassword, newPassword);
  }
}
