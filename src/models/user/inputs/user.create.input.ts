import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';

@InputType()
export class UserCreateInput {
  @IsString()
  @MaxLength(32)
  @Field()
  username: string;

  @IsEmail()
  @Field()
  email: string;

  // TODO: password check
  @IsString()
  @Field()
  password: string;
}
