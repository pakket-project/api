import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsUUID } from 'class-validator';

@ObjectType()
export class BaseModel {
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsDate()
  @Field()
  createdAt: Date;

  @IsDate()
  @Field()
  updatedAt: Date;
}
