import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@utils/logger';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: new Logger()
  });

  app.useGlobalPipes(new ValidationPipe());

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(8080);
}
bootstrap();
