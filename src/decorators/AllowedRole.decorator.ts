import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const AllowedRole = (roles: Role): CustomDecorator<string> => SetMetadata('roles', roles);
