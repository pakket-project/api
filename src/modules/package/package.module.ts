import { Module } from '@nestjs/common';
import { PackageResolver } from './package.resolver';

@Module({
  providers: [PackageResolver]
})
export class PackageModule {}
