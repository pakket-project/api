import { AuthService } from '@modules/auth';
import { PrismaService } from '@modules/prisma';
import {
  Injectable,
  CanActivate,
  Logger,
  ExecutionContext,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('auth');

  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.reflector.get('noAuth', context.getHandler())) {
      return true;
    }

    // eslint-disable-next-line prefer-destructuring
    let req: Request = GqlExecutionContext.create(context).getContext().req; // get request object

    // if not graphql request, get rest req obj
    if (!req) {
      req = context.switchToHttp().getRequest();
    }

    // get token
    let token = req.headers.authorization;

    // debugging
    if (this.config.get('NODE_ENV') === 'development' && token === 'bypass') {
      this.logger.warn('bypassing auth!');
      return true;
    }

    if (!token) {
      return false;
    }

    // strip Bearer
    token = token.replace('Bearer ', '');

    // verify jwt
    let jwt: JwtPayload;
    try {
      jwt = this.authService.verifyJWT(token);
    } catch (err) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }

    // get user from db
    const user = await this.prisma.user.findUnique({ where: { id: jwt.sub } });

    if (!user) {
      return false;
    }

    // bind user object to request
    req.user = user;

    const roles: Role = this.reflector.get('roles', context.getHandler());

    // check roles
    if (roles) {
      if (roles === 'user') {
        // user
        return user.role === 'user' || user.role === 'trusted_user' || user.role === 'admin';
      }

      if (roles === 'trusted_user') {
        // trusted user
        return user.role === 'trusted_user' || user.role === 'admin';
      }

      if (roles === 'admin') {
        // admin
        return user.role === 'admin';
      }

      return false;
    }

    // no roles defined, allow all
    return true;
  }
}
