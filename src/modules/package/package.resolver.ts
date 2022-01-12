import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class test {
  @Field()
  id: string;
}

@Resolver()
export class PackageResolver {
  @Query(() => test)
  test() {
    return { id: 'hoi' };
  }
}
