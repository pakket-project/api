import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class UserUpdateInput {
  @IsOptional()
  @MaxLength(32)
  @IsString()
  @Field({ nullable: true })
  username: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email: string;
}

// TODO: password validation

@InputType()
export class UserUpdatePasswordInput {
  @IsString()
  @Field()
  oldPassword: string;

  @IsString()
  @Field()
  newPassword: string;
}
