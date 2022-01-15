import { PrismaService } from '@modules/prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtPayload, sign, verify as verifyJWT } from 'jsonwebtoken';
import { hash, verify as verifyHash } from 'argon2';

@Injectable()
export class AuthService {
  private jwtSecret: string;

  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {
    this.jwtSecret = this.config.get('JWT_SECRET');
  }

  async hash(password: string): Promise<string> {
    return await hash(password, { hashLength: 32 });
  }

  async verifyHash(password: string, hash: string): Promise<boolean> {
    return await verifyHash(hash, password, { hashLength: 32 });
  }

  async generateJWT(user: User, password: string): Promise<string> {
    const verified = await this.verifyHash(password, user.password);

    if (!verified) {
      throw new HttpException('invalid_password', HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = {
      sub: user.id,
      user: {
        id: user.id,
        username: user.username
      }
    };

    return sign(payload, this.jwtSecret, { expiresIn: '12h' });
  }

  verifyJWT(token: string): JwtPayload {
    return verifyJWT(token, this.jwtSecret);
  }
}
