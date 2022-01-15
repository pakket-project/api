import { PackageModel, VersionModel } from '@models/package';
import { UserModel } from '@models/user';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Field, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';

@Resolver(PackageModel)
export class PackageResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveField(() => UserModel)
  async author(@Root() pkg: PackageModel): Promise<UserModel> {
    return await this.prisma.package
      .findUnique({
        where: { id: pkg.id },
        select: { author: true }
      })
      .author();
  }

  /**
   * Resolve versions.
   */
  @ResolveField(() => [VersionModel])
  async versions(@Root() pkg: PackageModel): Promise<VersionModel[]> {
    const versions = this.prisma.package
      .findUnique({
        where: { id: pkg.id },
        select: { versions: true }
      })
      .versions();

    return await versions;
  }
}
