/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { Request } from 'express';
import { User } from '@prisma/client';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
