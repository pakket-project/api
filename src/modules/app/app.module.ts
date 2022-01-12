import { PackageModule } from '@modules/package/package.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql')
    }),
    PackageModule
  ]
})
export class AppModule {}
