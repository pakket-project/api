import { Public } from '@decorators';
import { PrismaService } from '@modules/prisma';
import { UserService } from '@modules/user';
import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AuthService } from '.';

export class LoginDTO {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @Post('/login')
  async login(@Body() { password, username }: LoginDTO): Promise<string> {
    const user = await this.userService.getUser({ username });

    return await this.authService.generateJWT(user, password);
  }
}
