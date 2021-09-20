import { PackageModule } from '@modules/package/package.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({ controllers: [AppController], imports: [PackageModule] })
export class AppModule {}
