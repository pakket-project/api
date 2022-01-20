import { BaseModel } from '@models';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ArchType } from '@prisma/client';

registerEnumType(ArchType, { name: 'ArchType' });

@ObjectType()
export class VersionModel extends BaseModel {
  @Field()
  version: string;

  @Field(() => ArchType)
  arch: ArchType;

  @Field()
  popularity: number;

  // TODO: package, dependencies and dependents
}
