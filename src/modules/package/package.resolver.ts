import { PrismaService } from '@modules/prisma/prisma.service';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PackageResolver {
  constructor(private prisma: PrismaService) {}
}
