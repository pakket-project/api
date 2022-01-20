import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageResolver } from './package.resolver';

@Module({
  controllers: [PackageController],
  providers: [PackageResolver]
})
export class PackageModule {}
