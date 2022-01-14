import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from '.';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
