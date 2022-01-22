import { BaseModel } from '@models';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, { name: 'Role' });
@ObjectType()
export class UserModel extends BaseModel {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;

  // TODO: packages
}
