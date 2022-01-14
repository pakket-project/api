import { PrismaService } from '@modules/prisma/prisma.service';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class test {
  @Field()
  id: string;
}

@Resolver()
export class PackageResolver {
  constructor(private prisma: PrismaService) {}
}
