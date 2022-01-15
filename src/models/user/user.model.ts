import { BaseModel } from '@models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel extends BaseModel {
  @Field()
  username: string;

  @Field()
  email: string;

  // TODO: packages
}
