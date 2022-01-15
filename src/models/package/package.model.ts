import { BaseModel } from '@models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PackageModel extends BaseModel {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  license: string;

  @Field()
  homepage: string;

  @Field()
  popularity: number;
}
