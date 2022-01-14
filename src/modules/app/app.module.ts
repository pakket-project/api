import { AuthModule } from '@modules/auth/auth.module';
import { PackageModule } from '@modules/package/package.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql')
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    PackageModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
